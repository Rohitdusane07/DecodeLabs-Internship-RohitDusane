import Navbar from '@/components/sections/navbar';
import Hero from '@/components/sections/hero';
import FeatureInsights from '@/components/sections/feature-insights';
import ModelComparison from '@/components/sections/model-comparison';
import PredictionPlayground from '@/components/sections/prediction-playground';
import UploadCenter from '@/components/sections/upload-center';
import TrainingLab from '@/components/sections/training-lab';
import AnalyticsDashboard from '@/components/sections/analytics-dashboard';
import AIAssistant from '@/components/sections/ai-assistant';
import Pricing from '@/components/sections/pricing';
import Testimonials from '@/components/sections/testimonials';
import EnterpriseDashboard from '@/components/sections/enterprise-dashboard';
import ProjectShowcase from '@/components/sections/project-showcase';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureInsights />
        <ModelComparison />
        <PredictionPlayground />
        <UploadCenter />
        <TrainingLab />
        <AnalyticsDashboard />
        <AIAssistant />
        <Pricing />
        <Testimonials />
        <EnterpriseDashboard />
        <ProjectShowcase />
      </main>
      <Footer />
    </>
  );
}
