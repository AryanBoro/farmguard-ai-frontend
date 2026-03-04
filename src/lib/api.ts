const BASE = "https://borreooo-farmguard-ai.hf.space";

export interface CropType {
  id: string;
  name: string;
}

export interface PredictionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  prevention: string;
  severity: string;
  image_url?: string;
}

export interface HistoryItem {
  id: string;
  crop_type: string;
  disease: string;
  confidence: number;
  created_at: string;
  image_url?: string;
  severity?: string;
}

export interface DashboardStats {
  total_scans: number;
  diseases_detected: number;
  healthy_crops: number;
  accuracy: number;
}

export interface TrendData {
  date: string;
  scans: number;
  diseases: number;
}

export async function getCrops(): Promise<CropType[]> {
  const res = await fetch(`${BASE}/crops`);
  if (!res.ok) throw new Error("Failed to fetch crops");
  const data = await res.json();
  return data.crops || [];
}

export async function predict(file: File, cropType: string, cropAge: string, location: string): Promise<PredictionResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("crop_type", cropType);
  form.append("crop_age", cropAge);
  form.append("location", location);
  const res = await fetch(`${BASE}/predict`, { method: "POST", body: form });
  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
}

export async function getHistory(): Promise<HistoryItem[]> {
  const res = await fetch(`${BASE}/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}

export async function getStats(): Promise<DashboardStats> {
  const res = await fetch(`${BASE}/history/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function getTrends(): Promise<TrendData[]> {
  const res = await fetch(`${BASE}/history/trends`);
  if (!res.ok) throw new Error("Failed to fetch trends");
  return res.json();
}
