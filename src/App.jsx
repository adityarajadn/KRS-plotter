import React, { useState, useMemo } from 'react';
import { Clock, MapPin, BookOpen, Trash2, AlertCircle, Plus } from 'lucide-react';

// --- DATASET MOCKUP (Berdasarkan gambar yang diunggah) ---
const initialData = [
  // ==========================
  // Algoritma dan Struktur Data (COM60004) - 3 SKS
  // ==========================
  { id: 'alg-a-1', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'A', day: 'Selasa', start: '10:30', end: '12:10', room: 'TIF06 F3.14', sks: 3 },
  { id: 'alg-a-2', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'A', day: 'Kamis', start: '12:30', end: '14:10', room: 'TIF07 G1.3', sks: 3 },

  { id: 'alg-b-1', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'B', day: 'Senin', start: '07:00', end: '08:40', room: 'TIF07 G1.3', sks: 3 },
  { id: 'alg-b-2', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'B', day: 'Selasa', start: '07:00', end: '08:40', room: 'TIF06 F2.8', sks: 3 },

  { id: 'alg-c-1', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'C', day: 'Senin', start: '14:15', end: '15:55', room: 'TIF07 G1.2', sks: 3 },
  { id: 'alg-c-2', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'C', day: 'Selasa', start: '12:30', end: '14:10', room: 'TIF06 F4.1', sks: 3 },

  { id: 'alg-d-1', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'D', day: 'Selasa', start: '08:45', end: '10:25', room: 'TIF06 F3.3', sks: 3 },
  { id: 'alg-d-2', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'D', day: 'Kamis', start: '14:15', end: '15:55', room: 'TIF07 G1.6', sks: 3 },

  { id: 'alg-e-1', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'E', day: 'Rabu', start: '07:00', end: '08:40', room: 'TIF07 G1.6', sks: 3 },
  { id: 'alg-e-2', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'E', day: 'Kamis', start: '10:30', end: '12:10', room: 'TIF06 F4.2', sks: 3 },

  { id: 'alg-f-1', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'F', day: 'Senin', start: '08:45', end: '10:25', room: 'TIF07 G1.3', sks: 3 },
  { id: 'alg-f-2', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'F', day: 'Senin', start: '12:30', end: '14:10', room: 'TIF06 F2.2', sks: 3 },

  { id: 'alg-g-1', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'G', day: 'Senin', start: '08:45', end: '10:25', room: 'TIF07 G1.4', sks: 3 },
  { id: 'alg-g-2', subjectCode: 'COM60004', subjectName: 'Algoritma dan Struktur Data', className: 'G', day: 'Selasa', start: '07:00', end: '08:40', room: 'TIF06 F4.11', sks: 3 },

  // ==========================
  // Bahasa Indonesia (MPK60007) - 2 SKS
  // ==========================
  { id: 'bind-n7d', subjectCode: 'MPK60007', subjectName: 'Bahasa Indonesia', className: 'N7D', day: 'Selasa', start: '07:00', end: '08:40', room: 'TIF06 F2.4', sks: 2 },
  { id: 'bind-n7e', subjectCode: 'MPK60007', subjectName: 'Bahasa Indonesia', className: 'N7E', day: 'Selasa', start: '10:30', end: '12:10', room: 'TIF06 F2.2', sks: 2 },
  { id: 'bind-n7f', subjectCode: 'MPK60007', subjectName: 'Bahasa Indonesia', className: 'N7F', day: 'Kamis', start: '08:45', end: '10:25', room: 'TIF06 F2.8', sks: 2 },
  { id: 'bind-n7g', subjectCode: 'MPK60007', subjectName: 'Bahasa Indonesia', className: 'N7G', day: 'Kamis', start: '07:00', end: '08:40', room: 'TIF06 F2.9', sks: 2 },
  { id: 'bind-n7h', subjectCode: 'MPK60007', subjectName: 'Bahasa Indonesia', className: 'N7H', day: 'Kamis', start: '12:30', end: '15:00', room: 'TIF06 F2.4', sks: 2 },
  { id: 'bind-n7u', subjectCode: 'MPK60007', subjectName: 'Bahasa Indonesia', className: 'N7U', day: 'Rabu', start: '12:30', end: '15:00', room: 'TIF06 F2.2', sks: 2 },
  { id: 'bind-n7v', subjectCode: 'MPK60007', subjectName: 'Bahasa Indonesia', className: 'N7V', day: 'Rabu', start: '12:30', end: '15:00', room: 'TIF06 F2.4', sks: 2 },

  // ==========================
  // Metode Numerik (CIF63309) - 3 SKS
  // ==========================
  { id: 'mn-a', subjectCode: 'CIF63309', subjectName: 'Metode Numerik', className: 'A', day: 'Selasa', start: '07:00', end: '09:30', room: 'TIF06 F4.1', sks: 3 },
  { id: 'mn-b', subjectCode: 'CIF63309', subjectName: 'Metode Numerik', className: 'B', day: 'Senin', start: '09:35', end: '12:10', room: 'TIF06 F3.13', sks: 3 },
  { id: 'mn-c', subjectCode: 'CIF63309', subjectName: 'Metode Numerik', className: 'C', day: 'Rabu', start: '12:30', end: '15:15', room: 'TIF06 F4.6', sks: 3 },
  { id: 'mn-d', subjectCode: 'CIF63309', subjectName: 'Metode Numerik', className: 'D', day: 'Rabu', start: '15:20', end: '17:40', room: 'TIF06 F4.4', sks: 3 },
  { id: 'mn-e', subjectCode: 'CIF63309', subjectName: 'Metode Numerik', className: 'E', day: 'Selasa', start: '14:15', end: '17:00', room: 'TIF06 F3.13', sks: 3 },
  { id: 'mn-f', subjectCode: 'CIF63309', subjectName: 'Metode Numerik', className: 'F', day: 'Rabu', start: '09:35', end: '12:10', room: 'TIF06 F3.1', sks: 3 },
  { id: 'mn-g', subjectCode: 'CIF63309', subjectName: 'Metode Numerik', className: 'G', day: 'Selasa', start: '12:30', end: '15:15', room: 'TIF06 F4.5', sks: 3 },

  // ==========================
  // Jaringan Komputer (CIF63207) - 5 SKS
  // ==========================
  
  { id: 'jk-a-1', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'A', day: 'Senin', start: '12:30', end: '14:10', room: 'TIF06 F3.18', sks: 5 },
  { id: 'jk-a-2', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'A', day: 'Rabu', start: '07:00', end: '08:40', room: 'TIF07 G1.3', sks: 5 },
  { id: 'jk-a-3', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'A', day: 'Kamis', start: '14:15', end: '15:55', room: 'TIF06 F4.2', sks: 5 },

  { id: 'jk-b-1', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'B', day: 'Rabu', start: '16:00', end: '17:40', room: 'TIF07 G1.2', sks: 5 },
  { id: 'jk-b-2', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'B', day: 'Kamis', start: '10:30', end: '12:10', room: 'TIF06 F4.4', sks: 5 },
  { id: 'jk-b-3', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'B', day: 'Jumat', start: '07:00', end: '08:40', room: 'TIF06 F3.6', sks: 5 },

  { id: 'jk-c-1', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'C', day: 'Senin', start: '12:30', end: '14:10', room: 'TIF06 F3.7', sks: 5 },
  { id: 'jk-c-2', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'C', day: 'Selasa', start: '08:45', end: '10:25', room: 'TIF07 G1.2', sks: 5 },
  { id: 'jk-c-3', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'C', day: 'Kamis', start: '07:00', end: '08:40', room: 'TIF06 F3.7', sks: 5 },

  { id: 'jk-d-1', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'D', day: 'Selasa', start: '10:30', end: '12:10', room: 'TIF06 F4.10', sks: 5 },
  { id: 'jk-d-2', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'D', day: 'Rabu', start: '07:00', end: '08:40', room: 'TIF06 F4.3', sks: 5 },
  { id: 'jk-d-3', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'D', day: 'Rabu', start: '10:30', end: '12:10', room: 'TIF07 G1.2', sks: 5 },

  { id: 'jk-e-1', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'E', day: 'Senin', start: '07:00', end: '08:40', room: 'TIF07 G1.4', sks: 5 },
  { id: 'jk-e-2', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'E', day: 'Rabu', start: '10:30', end: '12:10', room: 'TIF06 F4.2', sks: 5 },
  { id: 'jk-e-3', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'E', day: 'Jumat', start: '07:00', end: '08:40', room: 'TIF06 F4.11', sks: 5 },

  { id: 'jk-f-1', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'F', day: 'Selasa', start: '08:45', end: '10:25', room: 'TIF07 G1.3', sks: 5 },
  { id: 'jk-f-2', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'F', day: 'Rabu', start: '14:15', end: '15:55', room: 'TIF06 F3.11', sks: 5 },
  { id: 'jk-f-3', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'F', day: 'Kamis', start: '10:30', end: '12:10', room: 'TIF06 F3.7', sks: 5 },

  { id: 'jk-g-1', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'G', day: 'Rabu', start: '10:30', end: '12:10', room: 'TIF07 G1.4', sks: 5 },
  { id: 'jk-g-2', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'G', day: 'Rabu', start: '12:30', end: '14:10', room: 'TIF06 F3.18', sks: 5 },
  { id: 'jk-g-3', subjectCode: 'CIF63207', subjectName: 'Jaringan Komputer', className: 'G', day: 'Kamis', start: '07:00', end: '08:40', room: 'TIF06 F4.14', sks: 5 },
  // ==========================
  // Kecerdasan Artifisial (CIF63110) - 2 SKS
  // ==========================
  { id: 'ai-a', subjectCode: 'CIF63110', subjectName: 'Kecerdasan Artifisial', className: 'A', day: 'Kamis', start: '08:45', end: '10:25', room: 'TIF06 F4.4', sks: 2 },
  { id: 'ai-b', subjectCode: 'CIF63110', subjectName: 'Kecerdasan Artifisial', className: 'B', day: 'Kamis', start: '07:00', end: '08:40', room: 'TIF06 F3.13', sks: 2 },
  { id: 'ai-c', subjectCode: 'CIF63110', subjectName: 'Kecerdasan Artifisial', className: 'C', day: 'Selasa', start: '07:00', end: '08:40', room: 'TIF06 F2.6', sks: 2 },
  { id: 'ai-d', subjectCode: 'CIF63110', subjectName: 'Kecerdasan Artifisial', className: 'D', day: 'Senin', start: '07:00', end: '08:40', room: 'TIF06 F4.11', sks: 2 },
  { id: 'ai-e', subjectCode: 'CIF63110', subjectName: 'Kecerdasan Artifisial', className: 'E', day: 'Kamis', start: '12:30', end: '14:10', room: 'TIF06 F2.5', sks: 2 },
  { id: 'ai-f', subjectCode: 'CIF63110', subjectName: 'Kecerdasan Artifisial', className: 'F', day: 'Selasa', start: '12:30', end: '14:10', room: 'TIF06 F3.18', sks: 2 },
  { id: 'ai-g', subjectCode: 'CIF63110', subjectName: 'Kecerdasan Artifisial', className: 'G', day: 'Jumat', start: '09:35', end: '11:15', room: 'TIF06 F4.11', sks: 2 },

  // ==========================
  // Interaksi Manusia dan Komputer (CIF63108) - 2 SKS
  // ==========================
  { id: 'imk-a', subjectCode: 'CIF63108', subjectName: 'Interaksi Manusia dan Komputer', className: 'A', day: 'Senin', start: '07:00', end: '08:40', room: 'TIF06 F2.5', sks: 2 },
  { id: 'imk-b', subjectCode: 'CIF63108', subjectName: 'Interaksi Manusia dan Komputer', className: 'B', day: 'Senin', start: '14:15', end: '15:55', room: 'TIF06 F3.6', sks: 2 },
  { id: 'imk-c', subjectCode: 'CIF63108', subjectName: 'Interaksi Manusia dan Komputer', className: 'C', day: 'Kamis', start: '12:30', end: '14:10', room: 'TIF06 F3.13', sks: 2 },
  { id: 'imk-d', subjectCode: 'CIF63108', subjectName: 'Interaksi Manusia dan Komputer', className: 'D', day: 'Kamis', start: '07:00', end: '08:40', room: 'TIF06 F4.9', sks: 2 },
  { id: 'imk-e', subjectCode: 'CIF63108', subjectName: 'Interaksi Manusia dan Komputer', className: 'E', day: 'Senin', start: '14:15', end: '15:55', room: 'TIF06 F4.13', sks: 2 },
  { id: 'imk-f', subjectCode: 'CIF63108', subjectName: 'Interaksi Manusia dan Komputer', className: 'F', day: 'Rabu', start: '07:00', end: '08:40', room: 'TIF06 F4.4', sks: 2 },
  { id: 'imk-g', subjectCode: 'CIF63108', subjectName: 'Interaksi Manusia dan Komputer', className: 'G', day: 'Rabu', start: '08:45', end: '10:25', room: 'TIF06 F3.17', sks: 2 },

  // ==========================
// Analisis dan Perancangan Sistem (CIF63106) - 5 SKS
// ==========================

{ id: 'aps-a-1', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'A', day: 'Senin', start: '10:30', end: '12:00', room: 'TIF06 F4.9', sks: 5 },
{ id: 'aps-a-2', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'A', day: 'Rabu', start: '08:45', end: '10:25', room: 'TIF07 G1.2', sks: 5 },
{ id: 'aps-a-3', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'A', day: 'Rabu', start: '14:15', end: '15:55', room: 'TIF06 F3.4', sks: 5 },

{ id: 'aps-b-1', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'B', day: 'Selasa', start: '12:30', end: '14:00', room: 'TIF06 F3.13', sks: 5 },
{ id: 'aps-b-2', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'B', day: 'Rabu', start: '07:00', end: '08:40', room: 'TIF06 F4.14', sks: 5 },
{ id: 'aps-b-3', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'B', day: 'Rabu', start: '12:30', end: '14:00', room: 'TIF07 G1.2', sks: 5 },

{ id: 'aps-c-1', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'C', day: 'Senin', start: '08:45', end: '10:25', room: 'TIF06 F3.12', sks: 5 },
{ id: 'aps-c-2', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'C', day: 'Rabu', start: '08:45', end: '10:25', room: 'TIF06 F3.16', sks: 5 },
{ id: 'aps-c-3', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'C', day: 'Kamis', start: '08:45', end: '10:25', room: 'TIF07 G1.6', sks: 5 },

{ id: 'aps-d-1', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'D', day: 'Senin', start: '10:30', end: '12:10', room: 'TIF07 G1.4', sks: 5 },
{ id: 'aps-d-2', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'D', day: 'Senin', start: '12:30', end: '14:00', room: 'TIF06 F3.3', sks: 5 },
{ id: 'aps-d-3', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'D', day: 'Selasa', start: '07:00', end: '08:40', room: 'TIF06 F4.10', sks: 5 },

{ id: 'aps-e-1', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'E', day: 'Senin', start: '16:00', end: '17:40', room: 'TIF06 F2.9', sks: 5 },
{ id: 'aps-e-2', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'E', day: 'Rabu', start: '16:00', end: '17:40', room: 'TIF06 F4.13', sks: 5 },
{ id: 'aps-e-3', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'E', day: 'Kamis', start: '07:00', end: '08:40', room: 'TIF07 G1.3', sks: 5 },

{ id: 'aps-f-1', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'F', day: 'Senin', start: '16:00', end: '17:40', room: 'TIF07 G1.3', sks: 5 },
{ id: 'aps-f-2', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'F', day: 'Selasa', start: '10:30', end: '12:10', room: 'TIF06 F3.16', sks: 5 },
{ id: 'aps-f-3', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'F', day: 'Kamis', start: '08:45', end: '10:25', room: 'TIF06 F4.1', sks: 5 },

{ id: 'aps-g-1', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'G', day: 'Senin', start: '10:30', end: '12:10', room: 'TIF06 F2.5', sks: 5 },
{ id: 'aps-g-2', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'G', day: 'Kamis', start: '12:30', end: '14:00', room: 'TIF07 G1.5', sks: 5 },
{ id: 'aps-g-3', subjectCode: 'CIF63106', subjectName: 'Analisis dan Perancangan Sistem', className: 'G', day: 'Jumat', start: '07:00', end: '08:40', room: 'TIF06 F3.16', sks: 5 },
];

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

export default function App() {
  const getEmptySchedule = () => ({
    Senin: [],
    Selasa: [],
    Rabu: [],
    Kamis: [],
    Jumat: []
  });

  const [plans, setPlans] = useState([getEmptySchedule()]);
  const [activePlanIndex, setActivePlanIndex] = useState(0);

  const schedule = plans[activePlanIndex];

  const setSchedule = (updater) => {
    setPlans(prevPlans => {
      const newPlans = [...prevPlans];
      newPlans[activePlanIndex] = typeof updater === 'function' ? updater(newPlans[activePlanIndex]) : updater;
      return newPlans;
    });
  };

  const [notification, setNotification] = useState(null);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Menganalisa matkul apa saja yang sudah diambil dan kelasnya
  // Output: { 'COM60004': 'A', 'CIF63207': 'B' }
  const selectedClasses = useMemo(() => {
    const selected = {};
    Object.values(schedule).flat().forEach(session => {
      selected[session.subjectCode] = session.className;
    });
    return selected;
  }, [schedule]);

  // Menghitung Total SKS berdasarkan Subject Code yang unik di jadwal
  const totalSKS = useMemo(() => {
    const uniqueSubjects = new Set();
    let total = 0;
    Object.values(schedule).flat().forEach(session => {
      if (!uniqueSubjects.has(session.subjectCode)) {
        uniqueSubjects.add(session.subjectCode);
        total += session.sks;
      }
    });
    return total;
  }, [schedule]);

  // Fungsi untuk memformat daftar sesi yang tersedia (mengeluarkan yang sudah di jadwal)
  const availableSessions = useMemo(() => {
    const scheduledIds = new Set(Object.values(schedule).flat().map(s => s.id));
    return initialData.filter(session => !scheduledIds.has(session.id));
  }, [schedule]);

  // --- DRAG AND DROP HANDLERS ---
  const handleDragStart = (e, session) => {
    e.dataTransfer.setData("sessionId", session.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Diperlukan agar elemen bisa di-drop
  };

  const handleDrop = (e, targetDay) => {
    e.preventDefault();
    const sessionId = e.dataTransfer.getData("sessionId");
    const session = initialData.find(s => s.id === sessionId);

    if (!session) return;

    // Validasi Hari
    if (session.day !== targetDay) {
      showNotif(`Gagal: Sesi ini harus ditaruh di hari ${session.day}!`);
      return;
    }

    // Cari semua sesi yang kelas dan matkulnya sama (termasuk praktikum)
    const relatedSessions = initialData.filter(
      s => s.subjectCode === session.subjectCode && s.className === session.className
    );

    // Validasi Bentrok Waktu untuk SEMUA sesi yang berkaitan
    let hasConflict = false;
    let conflictMsg = '';

    for (const rs of relatedSessions) {
      const rsDay = rs.day;
      const isConflict = schedule[rsDay].some(s => {
        return (rs.start >= s.start && rs.start < s.end) || 
               (rs.end > s.start && rs.end <= s.end);
      });

      if (isConflict) {
        hasConflict = true;
        conflictMsg = `Gagal: Bentrok di hari ${rsDay} untuk sesi ${rs.subjectName}!`;
        break;
      }
    }

    if (hasConflict) {
      showNotif(conflictMsg);
      return;
    }

    // Masukkan ke jadwal dan Sort berdasarkan jam mulai
    setSchedule(prev => {
      const newSchedule = { ...prev };
      relatedSessions.forEach(rs => {
        newSchedule[rs.day] = [...newSchedule[rs.day], rs].sort((a, b) => a.start.localeCompare(b.start));
      });
      return newSchedule;
    });

    if (relatedSessions.length > 1) {
      showNotif(`Sukses: ${relatedSessions.length} sesi otomatis ditambahkan!`);
    }
  };

  const removeSession = (sessionId) => {
    const sessionToRemove = initialData.find(s => s.id === sessionId);
    if (!sessionToRemove) return;

    setSchedule(prev => {
      const newSchedule = { ...prev };
      const { subjectCode, className } = sessionToRemove;
      
      Object.keys(newSchedule).forEach(day => {
        newSchedule[day] = newSchedule[day].filter(
          s => !(s.subjectCode === subjectCode && s.className === className)
        );
      });
      return newSchedule;
    });
  };

  // --- KOMPONEN KARTU ---
  const SessionCard = ({ session, isScheduled }) => {
    // Cek Aturan: Jika matkul ini sudah ada di jadwal, tapi kelasnya beda, maka disable
    const isLocked = selectedClasses[session.subjectCode] && selectedClasses[session.subjectCode] !== session.className;
    
    const relatedCount = initialData.filter(s => s.subjectCode === session.subjectCode && s.className === session.className).length;
    const isPracticum = session.room.includes('G');

    return (
      <div 
        draggable={!isLocked && !isScheduled}
        onDragStart={(e) => handleDragStart(e, session)}
        className={`p-3 rounded-lg border shadow-sm text-sm transition-all relative
          ${isScheduled ? 'bg-white border-blue-200 shadow-md mb-2' : 'mb-3 bg-white hover:border-blue-400'} 
          ${isLocked && !isScheduled ? 'opacity-40 bg-gray-100 cursor-not-allowed grayscale' : 'cursor-grab active:cursor-grabbing'}
        `}
      >
        <div className="flex justify-between items-start mb-1">
          <span className="font-semibold text-gray-800 leading-tight pr-5">{session.subjectName}</span>
          {isScheduled && (
            <button onClick={() => removeSession(session.id)} className="text-red-400 hover:text-red-600 transition-colors absolute top-3 right-3">
              <Trash2 size={16} />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-xs font-medium text-blue-600 mb-2">
          <BookOpen size={12} />
          <span>Kelas {session.className} • {session.subjectCode} • {session.sks} SKS</span>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <Clock size={12} />
          <span>{session.day}, {session.start} - {session.end}</span>
        </div>
        
        <div className={`flex items-center gap-1 text-xs mb-1 ${isPracticum ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
          <MapPin size={12} />
          <span>{session.room} {isPracticum && '(Praktikum)'}</span>
        </div>

        {!isScheduled && relatedCount > 1 && (
           <div className="mt-2 text-[10px] text-blue-600 font-medium bg-blue-50 p-1 px-2 rounded-md inline-block">
             Otomatis plot {relatedCount} sesi
           </div>
        )}
        
        {isLocked && !isScheduled && (
          <div className="mt-2 text-[10px] text-red-500 font-medium flex items-center gap-1 bg-red-50 p-1 rounded">
            <AlertCircle size={10} />
            Kelas lain sudah diambil
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">KRS Plotter UB</h1>
          <p className="text-xs text-gray-500">Drag & drop jadwal untuk menyusun rencana studi</p>
        </div>
        
        {/* Tabs Plan */}
        <div className="flex items-center gap-2">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => setActivePlanIndex(index)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activePlanIndex === index 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Plan {index + 1}
            </button>
          ))}
          <button
            onClick={() => {
              setPlans(prev => [...prev, getEmptySchedule()]);
              setActivePlanIndex(plans.length); // Pindah ke plan yang baru dibuat
            }}
            className="p-2 rounded-lg border border-dashed border-gray-300 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            title="Tambah Plan Baru"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 flex flex-col items-center">
          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Total Beban</span>
          <span className="text-2xl font-bold text-blue-800 leading-none">{totalSKS} <span className="text-sm font-normal text-blue-600">SKS</span></span>
        </div>
      </header>

      {/* Notifikasi Toast */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 animate-bounce">
          <AlertCircle size={18} className="text-red-400" />
          <span className="font-medium text-sm">{notification}</span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Sidebar - Pilihan Jadwal */}
        <aside className="w-80 bg-white border-r flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-700">Daftar Penawaran</h2>
            <p className="text-xs text-gray-500 mt-1">Tarik kartu ke hari yang sesuai.</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
            {availableSessions.length === 0 ? (
              <p className="text-center text-sm text-gray-400 mt-10">Semua jadwal sudah di-plot!</p>
            ) : (
              // Mengelompokkan tampilan sidebar berdasarkan Mata Kuliah
              Object.entries(
                availableSessions.reduce((acc, curr) => {
                  (acc[curr.subjectName] = acc[curr.subjectName] || []).push(curr);
                  return acc;
                }, {})
              ).map(([subjectName, sessions]) => (
                <div key={subjectName} className="mb-6">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{subjectName}</h3>
                  {sessions.map(session => (
                    <SessionCard key={session.id} session={session} isScheduled={false} />
                  ))}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Board - Wadah Hari */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
          <div className="flex gap-4 h-full min-w-max">
            {DAYS.map(day => (
              <div 
                key={day} 
                className="w-72 flex flex-col h-full rounded-xl border-2 border-dashed border-gray-200 bg-white shadow-sm overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
              >
                {/* Header Hari */}
                <div className={`py-3 px-4 text-center border-b font-bold tracking-wide
                  ${day === 'Senin' ? 'bg-blue-500 text-white' : 
                    day === 'Selasa' ? 'bg-indigo-500 text-white' :
                    day === 'Rabu' ? 'bg-cyan-600 text-white' :
                    day === 'Kamis' ? 'bg-teal-500 text-white' : 'bg-emerald-500 text-white'}`}
                >
                  {day}
                </div>
                
                {/* Area Drop & Item Terjadwal */}
                <div className="flex-1 p-3 bg-gray-50/30 overflow-y-auto">
                  {schedule[day].length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-300 text-sm italic font-medium border-2 border-transparent border-dashed rounded-lg">
                      Kosong
                    </div>
                  ) : (
                    schedule[day].map(session => (
                      <SessionCard key={session.id} session={session} isScheduled={true} />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
