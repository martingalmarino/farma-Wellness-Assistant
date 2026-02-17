# FarmaQuiero Demo - Agentic Wellness Assistant

A production-quality demo showcasing an AI-powered wellness assistant integrated into an e-commerce storefront. Built with Next.js 14, TypeScript, and TailwindCSS.

## 🎯 Features

- **4-Step Wellness Assistant Flow**
  - Choose your wellness goal (Sleep, Energy, Gut, Skin)
  - Answer 3 contextual questions
  - Get personalized product recommendations
  - Smart kit bundle suggestions

- **Intelligent Recommendation Engine**
  - Rule-based algorithm with 30 hardcoded products
  - 55% match score + 25% popularity + 20% margin
  - Safety warnings for sensitive conditions
  - Disclaimer-first approach

- **Cart Optimization Agent**
  - Cross-sell suggestions based on cart contents
  - Free shipping threshold recommendations
  - Real-time cart analysis

- **Mock Checkout Flow**
  - Order confirmation simulation
  - Replenishment reminder feature
  - Next best action suggestions

- **Analytics & Debug Tools**
  - Event logging for all user interactions
  - Debug page to view event history
  - Console logging for development

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** React Context API
- **Storage:** localStorage (cart + events)
- **Data:** Hardcoded JSON (no database)

## 📁 Project Structure

```
farmaquiero-demo/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── assistant/
│   │   └── page.tsx        # Wellness assistant flow
│   ├── cart/
│   │   └── page.tsx        # Shopping cart
│   ├── checkout/
│   │   └── page.tsx        # Checkout confirmation
│   └── debug/
│       └── page.tsx        # Analytics debug panel
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── ProductCard.tsx     # Product display card
│   ├── AssistantWidget.tsx # Floating assistant button
│   ├── Stepper.tsx         # Progress indicator
│   └── RecommendationPanel.tsx  # Recommendations display
├── context/
│   └── CartContext.tsx     # Cart state management
├── data/
│   ├── products.ts         # 30 hardcoded products
│   └── kits.ts             # 6 kit bundles
├── lib/
│   ├── agentEngine.ts      # Recommendation logic
│   ├── cartOptimizer.ts    # Cart optimization
│   └── eventLog.ts         # Analytics logging
└── README.md
```

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design System

- **Primary Color:** Pink (#E91E63)
- **Typography:** Inter font family
- **Layout:** Clean, modern, generous whitespace
- **Responsive:** Mobile-first design

## 📊 Data Structure

### Products (30 items)

Each product includes:
- SKU, name, brand
- Category: sleep | energy | gut | skin | general
- Benefits array
- Price, margin score, popularity score
- Stock status, warnings, tags

### Kits (6 bundles)

Pre-configured bundles with:
- Multiple SKUs
- Discount percentage
- Category-specific benefits

## 🧠 Agent Logic

### Recommendation Algorithm

```typescript
finalScore = (matchScore * 0.55) + (popularityScore * 0.25) + (marginScore * 0.20)
```

- **Match Score:** Based on goal + answers
- **Popularity Score:** User satisfaction metric
- **Margin Score:** Product quality indicator

### Cart Optimization

- Free shipping threshold suggestions
- Cross-sell based on cart category
- Complementary product recommendations
- Maximum 2 suggestions at a time

## ⚠️ Safety Features

- No medical advice or dosing recommendations
- Disclaimers on all recommendation pages
- Sensitive condition warnings (pregnancy, medications)
- Pharmacist consultation callouts

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, benefits, top products |
| `/assistant` | 4-step wellness assistant flow |
| `/cart` | Shopping cart with optimization suggestions |
| `/checkout` | Mock checkout with order confirmation |
| `/debug` | Analytics event log viewer |

## 🔧 Environment Variables

All features work without environment variables. Optional:

```bash
# .env.local (optional)
OPENAI_API_KEY=your_key_here  # For enhanced LLM responses (not implemented in this version)
```

## 📈 Analytics Events

Tracked events:
- `assistant_goal_selected`
- `assistant_question_answered`
- `assistant_recommendations_generated`
- `add_to_cart`
- `remove_from_cart`
- `cart_viewed`
- `cart_suggestion_added`
- `checkout_simulated`
- `checkout_reminder_toggled`

View all events at `/debug`

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Other Platforms

Works on any Next.js-compatible platform:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway

## 🎭 Demo Limitations

This is a **demonstration project** with:
- ❌ No real payment processing
- ❌ No database or backend API
- ❌ No user authentication
- ❌ No email functionality
- ❌ Hardcoded data only

## 📝 License

This is a demo project for portfolio/educational purposes.

## 🤝 Contributing

This is a demo project and not accepting contributions.

## 📧 Contact

For questions about this demo, please open an issue.

---

**Built with ❤️ for FarmaQuiero Demo**
