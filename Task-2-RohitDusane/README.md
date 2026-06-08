# ClassifyAI - AI-Powered Classification Studio

A production-ready web application for training, deploying, and monitoring machine learning classifiers. Upload CSV data, classify text in real-time, and visualize results with beautiful charts and metrics.

## Features

- **Real-time Text Classification** - Classify individual texts with multiple model options (DistilBERT, BERT Base, RoBERTa)
- **Batch CSV Processing** - Upload CSV files and classify thousands of rows automatically
- **Interactive Playground** - Test classifications with live results and confidence scores
- **Training Lab** - Simulate model training with configurable parameters
- **Analytics Dashboard** - Visualize classification results with interactive charts
- **AI Assistant** - Chat interface for classification guidance
- **Beautiful UI** - Modern, responsive design with dark mode support

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide Icons, Recharts
- **Backend**: Supabase (PostgreSQL, Edge Functions)


## Classification Categories

The system classifies text into 5 categories:

1. **Positive** - Compliments, praise, satisfaction
2. **Negative** - Complaints, criticism, frustration
3. **Neutral** - Factual statements, general content
4. **Query** - Questions, requests for help
5. **Financial** - Revenue, pricing, economic data

## Features in Detail

### Prediction Playground
- Real-time single text classification
- Model selection (DistilBERT, BERT Base, RoBERTa, GPT-2)
- Confidence scores and probability distribution
- Sample texts for quick testing

### Upload Center
- Drag-and-drop CSV upload
- Automatic text column detection
- Optional ground truth column for accuracy
- Progress tracking during batch processing

### Classification Results
- Interactive distribution charts (bar + pie)
- Accuracy, Precision, Recall, F1 metrics (when labels provided)
- Paginated results table
- Export results to CSV
- Misclassification highlighting

### Training Lab
- Simulated model training interface
- Configurable epochs and learning rate
- Real-time progress visualization

### Analytics Dashboard
- Mock statistics and charts
- Model performance comparison
- Usage metrics

## Technologies

- [Next.js 14] - React framework
- [Tailwind CSS] - Styling
- [shadcn/ui] - UI components
- [Recharts] - Charts
- [Lucide]- Icons



## 👨‍💻 Developer

* Rohit Vijay Dusane
