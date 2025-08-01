import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, BarChart3, Users } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Package className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Sistema de Inventario
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gestiona tu inventario de manera eficiente con nuestro sistema CRUD completo. 
            Control total de productos, stock y reportes en tiempo real.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <a href="/auth">Comenzar Ahora</a>
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Gestión de Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Agrega, edita y elimina productos fácilmente. Control completo de tu inventario.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Dashboard Intuitivo</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualiza estadísticas importantes y mantén el control de tu negocio.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Multi-usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sistema seguro con autenticación. Cada usuario tiene su propio inventario.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">¿Listo para empezar?</CardTitle>
              <CardDescription>
                Crea tu cuenta gratuita y comienza a gestionar tu inventario hoy mismo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="w-full max-w-xs">
                <a href="/auth">Crear Cuenta Gratis</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
