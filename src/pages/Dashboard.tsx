import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  LogOut, 
  User,
  Star,
  Bell,
  Settings,
  Loader2,
  List,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import StockAnalysis from '@/components/StockAnalysis';
import StockListComponent from '@/components/StockList';
import { stockDataService } from '@/services/stockData';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleStockSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add .NS suffix if not present for Indian stocks
      const symbol = searchQuery.toUpperCase().includes('.NS') 
        ? searchQuery.toUpperCase() 
        : `${searchQuery.toUpperCase()}.NS`;
      setSelectedStock(symbol);
    }
  };

  const handleStockSelect = (symbol: string) => {
    setSelectedStock(symbol);
  };

  const popularStocks = [
    { symbol: 'INFY.NS', name: 'Infosys', price: 1456.75, change: 2.34, changePercent: 0.16 },
    { symbol: 'TCS.NS', name: 'TCS', price: 3542.80, change: -15.20, changePercent: -0.43 },
    { symbol: 'RELIANCE.NS', name: 'Reliance', price: 2456.90, change: 12.45, changePercent: 0.51 },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', price: 1678.25, change: 8.75, changePercent: 0.52 },
    { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', price: 987.60, change: -5.40, changePercent: -0.54 },
    { symbol: 'SBIN.NS', name: 'SBI', price: 567.80, change: 3.20, changePercent: 0.57 }
  ];

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated || !user) {
    return null;
  }

  // Show stock analysis if a stock is selected
  if (selectedStock) {
    return (
      <StockAnalysis 
        symbol={selectedStock} 
        onBack={() => setSelectedStock(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Stock Analyzer</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Analyze stocks with comprehensive fundamental, technical, and sentiment analysis.
          </p>
        </div>

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="stocks" className="flex items-center space-x-2">
              <List className="h-4 w-4" />
              <span>All Stocks</span>
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Watchlist</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Quick Stock Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStockSearch} className="flex space-x-4">
                  <Input
                    type="text"
                    placeholder="Enter stock symbol (e.g., INFY, TCS, RELIANCE)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Analyze
                  </Button>
                </form>
                <p className="text-sm text-gray-500 mt-2">
                  Enter Indian stock symbols. .NS suffix will be added automatically.
                </p>
              </CardContent>
            </Card>

            {/* Popular Stocks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Popular Stocks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedStock(stock.symbol)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{stock.name}</h3>
                          <p className="text-sm text-gray-500">{stock.symbol}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            ₹{stock.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span className={`text-sm font-medium ${
                              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                            </span>
                          </div>
                          <Badge 
                            variant={stock.changePercent >= 0 ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Stocks Analyzed</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Watchlist</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Alerts</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <Bell className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stocks">
            <StockListComponent onStockSelect={handleStockSelect} />
          </TabsContent>

          <TabsContent value="watchlist">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Your Watchlist</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No stocks in watchlist</h3>
                  <p className="text-gray-600 mb-4">
                    Add stocks to your watchlist to track their performance
                  </p>
                  <Button onClick={() => setActiveTab('stocks')}>
                    Browse All Stocks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;