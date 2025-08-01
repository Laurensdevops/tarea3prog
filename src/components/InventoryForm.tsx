import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface InventoryItem {
  id?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  sku: string;
}

interface InventoryFormProps {
  item?: InventoryItem | null;
  onClose: () => void;
}
  
const InventoryForm = ({ item, onClose }: InventoryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    category: '',
    sku: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description || '',
        quantity: item.quantity,
        price: item.price,
        category: item.category || '',
        sku: item.sku || '',
      });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      if (item?.id) {
        // Update existing item
        const { error } = await supabase
          .from('inventory')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.id);

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Producto actualizado correctamente',
        });
      } else {
        // Create new item
        const { error } = await supabase
          .from('inventory')
          .insert({
            ...formData,
            user_id: user.id,
          });

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Producto creado correctamente',
        });
      }

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al guardar el producto',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="border rounded-lg p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {item ? 'Editar Producto' : 'Agregar Producto'}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Producto*</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
              placeholder="Código del producto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category"></Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="Ej: Electrónicos, Ropa, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad*</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Precio*</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Descripción del producto..."
            rows={3}
          />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : item ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;