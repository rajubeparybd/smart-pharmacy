# UIU Smart Pharmacy

A modern Next.js-based pharmacy management system with AI-powered prescription processing that allows users to browse medicines, upload prescriptions, and proceed to payment.

## Features

- 🔍 Browse and search medicines
- 🛒 Add medicines to cart with quantity controls
- 📦 Real-time stock management
- 🤖 **AI-Powered Prescription Processing** (Google Gemini)
  - Upload prescription images (JPG, PNG, WEBP) or PDF
  - Automatic medicine extraction and recognition
  - Smart medicine matching with database
  - Automatic cart population
- 💳 Shopping cart modal with order summary
- 📱 Responsive design with Tailwind CSS
- ⚡ Built with Next.js 15 and React 19

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- Google Gemini API key (for prescription processing feature)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rajubeparybd/smart-pharmacy.git
cd smart-pharmacy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
cp .env.local.example .env.local

# Add your Google Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note**: Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Prescription Processing Setup

For detailed instructions on setting up the Google Gemini AI integration, see [GEMINI_SETUP.md](./GEMINI_SETUP.md).

### Quick Setup:
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add `GEMINI_API_KEY` to `.env.local`
3. Restart development server
4. Upload a prescription and let AI do the rest!