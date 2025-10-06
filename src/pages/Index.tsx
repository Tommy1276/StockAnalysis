import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, BarChart3, Newspaper, Users, LogIn, UserPlus } from 'lucide-react';
import StockAnalysis from '@/components/StockAnalysis';

export default function Index() {
  const [symbol, setSymbol] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!symbol.trim()) return;
    setLoading(true);
    setSelectedStock(symbol.toUpperCase());
    setLoading(false);
  };

  const popularStocks = [
    { symbol: 'INFY.NS', name: 'Infosys' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">StockSense</h1>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-500 hidden md:block">AI-Powered Stock Analysis Platform</p>
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedStock ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Stock Analysis
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get detailed fundamental, technical, and sentiment analysis for any stock
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter stock symbol (e.g., INFY.NS)"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} disabled={loading}>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze
                  </Button>
                </div>
              </div>

              {/* Popular Stocks */}
              <div className="mb-12">
                <p className="text-sm text-gray-500 mb-4">Popular stocks to analyze:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularStocks.map((stock) => (
                    <Button
                      key={stock.symbol}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSymbol(stock.symbol);
                        setSelectedStock(stock.symbol);
                      }}
                    >
                      {stock.symbol}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Fundamental Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Financial health, valuation metrics, and growth potential analysis
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Technical Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Price patterns, indicators, and trading signals
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Newspaper className="h-12 w-12 text-orange-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">News & Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Latest news analysis with AI-powered sentiment scoring
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Peer Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Compare with industry peers and sector benchmarks
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-600 text-white rounded-lg p-8 text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Analyzing?</h3>
              <p className="text-blue-100 mb-6">
                Join thousands of investors making smarter decisions with StockSense
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/signup">
                  <Button size="lg" variant="secondary">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This platform is for educational purposes only and does not constitute financial advice. 
                Always consult with a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </>
        ) : (
          <StockAnalysis symbol={selectedStock} onBack={() => setSelectedStock('')} />
        )}
      </div>
    </div>
  );
}