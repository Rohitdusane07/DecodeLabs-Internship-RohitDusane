import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const modelLatency: Record<string, number> = {
  distilbert: 45,
  "bert-base": 85,
  roberta: 95,
  "gpt2-small": 120,
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { text, model = "distilbert" } = await req.json();

    if (!text || !text.trim()) {
      return new Response(
        JSON.stringify({ error: "Text input is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const categories = ["Positive", "Negative", "Neutral", "Query", "Financial"];
    const scores: Record<string, number> = {};
    let maxCat = categories[0];
    let maxScore = 0;

    categories.forEach((cat) => {
      const s = Math.random();
      scores[cat] = Math.round(s * 100) / 100;
      if (s > maxScore) {
        maxScore = s;
        maxCat = cat;
      }
    });

    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    Object.keys(scores).forEach((k) => {
      scores[k] = Math.round((scores[k] / total) * 100) / 100;
    });

    const maxTotal = Object.values(scores).reduce((a, b) => a + b, 0);
    const confidence = Math.round((scores[maxCat] / maxTotal) * 100);

    const baseLatency = modelLatency[model] || 80;
    const latency_ms = Math.round(baseLatency + Math.random() * 20);

    const data = {
      category: maxCat,
      confidence,
      scores,
      model,
      latency_ms,
    };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
