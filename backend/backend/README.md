StockSense - AI-Powered Stock Analysis Platform
A comprehensive full-stack web application that provides detailed stock analysis including fundamental analysis, technical indicators, news sentiment, and AI-powered buy/hold/sell recommendations.

🚀 Features
Comprehensive Stock Analysis: Get complete analysis for any Indian stock (NSE symbols)
Fundamental Analysis: Financial metrics, valuation ratios, and company health indicators
Technical Analysis: RSI, MACD, moving averages, support/resistance levels
News & Sentiment: Latest news with AI-powered sentiment analysis
Interactive Charts: Price charts with technical indicators
AI Recommendations: Smart buy/hold/sell recommendations with reasoning
Real-time Data: Live stock prices and market data (demo mode with mock data)
🛠 Tech Stack
Frontend
React 18 with TypeScript
Tailwind CSS for styling
Shadcn/ui components
Recharts for data visualization
React Query for state management
Backend
Node.js with Express.js
MongoDB for data storage (optional)
RESTful API architecture
CORS enabled for cross-origin requests
Analytics (Future Enhancement)
Python workers for data fetching
pandas for data processing
yfinance for stock data
Sentiment analysis for news processing
📦 Installation & Setup
Prerequisites
Node.js (v16 or higher)
npm or pnpm
MongoDB (optional - app works without database)
Quick Start
Clone and Setup Frontend

# Frontend is already set up in current directory
pnpm install
pnpm run dev
Setup Backend

cd backend
npm install
npm start
Access the Application

Frontend: http://localhost:5173
Backend API: http://localhost:5000
Environment Variables (Optional)
Create a .env file in the backend directory:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/stocksense
🎯 Usage
Search for Stocks: Enter any Indian stock symbol (e.g., INFY.NS, TCS.NS, RELIANCE.NS)
View Analysis: Get comprehensive analysis across multiple tabs:
Fundamentals: P/E, P/B, ROE, debt ratios, market cap
Technicals: RSI, MACD, moving averages, trend analysis
News: Recent news with sentiment scoring
Chart: Interactive price charts with indicators
Get Recommendations: AI-powered buy/hold/sell recommendations with detailed reasoning
📊 API Endpoints
GET /api/health - Health check
GET /api/stock/:symbol - Complete stock analysis
GET /api/chart/:symbol - Chart data
GET /api/fundamentals/:symbol - Fundamental metrics
GET /api/technicals/:symbol - Technical indicators
GET /api/news/:symbol - News and sentiment
🔧 Development
Frontend Development
pnpm run dev     # Start development server
pnpm run build   # Build for production
pnpm run lint    # Run linting
Backend Development
cd backend
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
🚀 Production Deployment
Docker Deployment (Future Enhancement)
docker-compose up -d
Manual Deployment
Build frontend: pnpm run build
Deploy backend to your server
Set up MongoDB (optional)
Configure environment variables
📈 Current Status
MVP Features Implemented:

✅ Complete React frontend with modern UI
✅ Express.js backend with RESTful API
✅ Stock search and analysis display
✅ Mock data for demonstration
✅ Interactive charts and visualizations
✅ AI recommendation engine
✅ Responsive design
Next Phase Enhancements:

🔄 Real-time data integration (yfinance, Alpha Vantage)
🔄 Python analytics workers
🔄 Advanced sentiment analysis
🔄 User authentication
🔄 Portfolio tracking
🔄 PDF report generation
🔄 Email alerts
⚠️ Disclaimer
This application is for educational and demonstration purposes only. The stock analysis and recommendations provided should not be considered as financial advice. Always consult with qualified financial advisors before making investment decisions.

🤝 Contributing
Fork the repository
Create a feature branch
Make your changes
Submit a pull request
📄 License
MIT License - see LICENSE file for details

🙋‍♂️ Support
For questions or issues, please open an issue on GitHub or contact the development team.

Built with ❤️ using React, Node.js, and modern web technologies