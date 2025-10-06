import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, RefreshCw, Target, Shield, Users, BarChart3 } from 'lucide-react';
import StockChart from './StockChart';
import { stockApi, StockAnalysisData } from '@/services/api';

interface StockAnalysisProps {
  symbol: string;
  onBack: () => void;
}

const StockAnalysis: React.FC<StockAnalysisProps> = ({ symbol, onBack }) => {
  const [data, setData] = useState<StockAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStockData();
  }, [symbol]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await stockApi.getStockAnalysis(symbol);
      setData(response);
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Analyzing {symbol}...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'No data available'}</p>
        <Button onClick={fetchStockData} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  const getRecommendationColor = (action: string) => {
    switch (action) {
      case 'BUY': return 'bg-green-100 text-green-800 border-green-300';
      case 'SELL': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-600';
      case 'bearish': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
        <Button onClick={fetchStockData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stock Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
              <p className="text-lg text-gray-600">{data.symbol}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">₹{data.price.toFixed(2)}</div>
              <div className="flex items-center justify-end space-x-2">
                {getTrendIcon(data.change)}
                <span className={`text-lg font-medium ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Scores Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-gray-600 mb-1">Fundamental</p>
            <p className={`text-2xl font-bold ${getScoreColor(data.fundamentals.fundamentalScore)}`}>
              {data.fundamentals.fundamentalScore}/100
            </p>
            <Progress value={data.fundamentals.fundamentalScore} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm text-gray-600 mb-1">Technical</p>
            <p className={`text-2xl font-bold ${getScoreColor(data.technicals.technicalScore)}`}>
              {data.technicals.technicalScore}/100
            </p>
            <Progress value={data.technicals.technicalScore} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-sm text-gray-600 mb-1">Sentiment</p>
            <p className={`text-2xl font-bold ${getScoreColor(data.sentiment.score)}`}>
              {data.sentiment.score}/100
            </p>
            <Progress value={data.sentiment.score} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-sm text-gray-600 mb-1">Overall</p>
            <p className={`text-2xl font-bold ${getScoreColor(data.recommendation.score)}`}>
              {data.recommendation.score}/100
            </p>
            <Progress value={data.recommendation.score} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recommendation Banner */}
      <Card className="border-2 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge className={`text-lg px-4 py-2 ${getRecommendationColor(data.recommendation.action)}`}>
                {data.recommendation.action}
              </Badge>
              <div>
                <p className="text-lg font-semibold">Target: ₹{data.recommendation.targetPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{data.recommendation.timeHorizon}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Stop Loss</p>
              <p className="text-lg font-semibold text-red-600">₹{data.recommendation.stopLoss.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Key Reasons:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              {data.recommendation.reasons.map((reason, index) => (
                <li key={index}>• {reason}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="fundamentals" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
          <TabsTrigger value="technicals">Technicals</TabsTrigger>
          <TabsTrigger value="news">News & Sentiment</TabsTrigger>
          <TabsTrigger value="peers">Peer Comparison</TabsTrigger>
          <TabsTrigger value="chart">Price Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="fundamentals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fundamental Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Market Cap</p>
                  <p className="text-lg font-semibold">{data.fundamentals.marketCap}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">P/E Ratio</p>
                  <p className="text-lg font-semibold">{data.fundamentals.pe.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">P/B Ratio</p>
                  <p className="text-lg font-semibold">{data.fundamentals.pb.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ROE (%)</p>
                  <p className="text-lg font-semibold">{data.fundamentals.roe.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Debt/Equity</p>
                  <p className="text-lg font-semibold">{data.fundamentals.debtToEquity.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-lg font-semibold">{data.fundamentals.revenue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Profit Margin</p>
                  <p className="text-lg font-semibold">{data.fundamentals.profitMargin.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Ratio</p>
                  <p className="text-lg font-semibold">{data.fundamentals.currentRatio.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dividend Yield</p>
                  <p className="text-lg font-semibold">{data.fundamentals.dividendYield.toFixed(2)}%</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Analysis Insights</h4>
                <div className="space-y-2">
                  {data.fundamentals.fundamentalAnalysis.map((insight, index) => (
                    <p key={index} className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technicals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">RSI</p>
                  <p className="text-lg font-semibold">{data.technicals.rsi.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">MACD</p>
                  <p className="text-lg font-semibold">{data.technicals.macd.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">20-Day SMA</p>
                  <p className="text-lg font-semibold">₹{data.technicals.sma20.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">50-Day SMA</p>
                  <p className="text-lg font-semibold">₹{data.technicals.sma50.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Support</p>
                  <p className="text-lg font-semibold">₹{data.technicals.support.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Resistance</p>
                  <p className="text-lg font-semibold">₹{data.technicals.resistance.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">Trend</p>
                <Badge variant="outline" className="mt-1">
                  {data.technicals.trend}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Technical Insights</h4>
                <div className="space-y-2">
                  {data.technicals.technicalAnalysis.map((insight, index) => (
                    <p key={index} className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.news.map((item, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 flex-1 text-sm">{item.title}</h4>
                        <div className="flex space-x-1 ml-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              item.sentiment === 'positive' ? 'text-green-700 border-green-300' :
                              item.sentiment === 'negative' ? 'text-red-700 border-red-300' :
                              'text-gray-700 border-gray-300'
                            }`}
                          >
                            {item.sentiment}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.impact}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{item.summary}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{item.source}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Overall Sentiment</p>
                    <p className={`text-2xl font-bold capitalize ${getSentimentColor(data.sentiment.overall)}`}>
                      {data.sentiment.overall}
                    </p>
                    <Progress value={data.sentiment.score} className="mt-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Social Mentions</p>
                      <p className="text-lg font-semibold">{data.sentiment.socialMediaMentions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Analyst Ratings</p>
                      <div className="text-sm">
                        <span className="text-green-600">Buy: {data.sentiment.analystRatings.buy}</span> | 
                        <span className="text-yellow-600"> Hold: {data.sentiment.analystRatings.hold}</span> | 
                        <span className="text-red-600"> Sell: {data.sentiment.analystRatings.sell}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Sentiment Insights</h4>
                    <div className="space-y-2">
                      {data.sentiment.sentimentAnalysis.map((insight, index) => (
                        <p key={index} className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {insight}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="peers" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peer Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.peerComparison.peers.map((peer, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{peer.name}</h4>
                          <p className="text-sm text-gray-600">{peer.symbol}</p>
                        </div>
                        <p className="font-semibold">₹{peer.price.toFixed(2)}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">P/E</p>
                          <p className="font-medium">{peer.pe.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">ROE</p>
                          <p className="font-medium">{peer.roe.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">D/E</p>
                          <p className="font-medium">{peer.debtToEquity.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Industry Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Industry Ranking</h4>
                    <p className="text-lg">
                      <span className="font-bold text-blue-600">#{data.peerComparison.ranking.position}</span>
                      <span className="text-gray-600"> out of {data.peerComparison.ranking.totalCompanies}</span>
                    </p>
                    <p className="text-sm text-gray-600">{data.peerComparison.ranking.category} sector</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Industry Averages</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-600">P/E Ratio</p>
                        <p className="font-semibold">{data.peerComparison.industryAverage.pe}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ROE</p>
                        <p className="font-semibold">{data.peerComparison.industryAverage.roe}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Debt/Equity</p>
                        <p className="font-semibold">{data.peerComparison.industryAverage.debtToEquity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Profit Margin</p>
                        <p className="font-semibold">{data.peerComparison.industryAverage.profitMargin}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Comparison Insights</h4>
                    <div className="space-y-2">
                      {data.peerComparison.comparisonAnalysis.map((insight, index) => (
                        <p key={index} className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {insight}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chart">
          <StockChart symbol={symbol} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockAnalysis;