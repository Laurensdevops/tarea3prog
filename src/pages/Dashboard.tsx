import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Package, Plus, BarChart3 } from 'lucide-react';
import InventoryList from '@/components/InventoryList';
import InventoryForm from '@/components/InventoryForm';
import { useState } from 'react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Laurens Devops by christofere Laurencio</h1>
              <p className="text-sm text-muted-foreground">
                Bienvenido, {user?.email}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">En el inventario</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$-</div>
              <p className="text-xs text-muted-foreground">Del inventario</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorías</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">Diferentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inventario</CardTitle>
                <CardDescription>
                  Gestiona todos tus productos
                </CardDescription>
              </div>
              <Button onClick={handleAddNew} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Agregar Producto</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showForm ? (
              <InventoryForm 
                item={editingItem}
                onClose={handleFormClose}
              />
            ) : (
              <InventoryList onEdit={handleEdit} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;