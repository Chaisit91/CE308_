/**
 * MediaPlayerScreen.tsx
 * React Native — Pure StyleSheet
 * expo install expo-av @react-native-community/slider expo-document-picker
 */

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import Slider from "@react-native-community/slider";
import * as DocumentPicker from "expo-document-picker";

// ─── Constants ────────────────────────────────────────────────────────────────

const C = {
  bg: "#0d0d0d",
  card: "#161616",
  border: "#222",
  red: "#e50914",
  text: "#ffffff",
  muted: "#555555",
  dim: "#aaaaaa",
};

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
const QUALITY_OPTIONS = ["Auto", "1080p", "720p", "480p", "360p"];
const DEMO_SOURCES = [
  {
    label: "Big Buck Bunny",
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    isAudio: false,
  },
  {
    label: "Elephant Dream",
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    isAudio: false,
  },
  {
    label: "Sample Audio (MP3)",
    uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    isAudio: true,
  },
];

function fmt(ms: number) {
  if (!ms || isNaN(ms)) return "0:00";
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MediaPlayerScreen() {
  const videoRef = useRef<Video>(null);

  const [inputUri, setInputUri] = useState("");
  const [activeUri, setActiveUri] = useState("");
  const [isAudio, setIsAudio] = useState(false);
  const [sourceTab, setSourceTab] = useState<"url" | "local">("url");

  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [looping, setLooping] = useState(false);
  const [quality, setQuality] = useState("Auto");

  const [speedModal, setSpeedModal] = useState(false);
  const [qualityModal, setQualityModal] = useState(false);
  const [demoModal, setDemoModal] = useState(false);

  // ── load ──────────────────────────────────────────────────────────────────

  const load = (uri: string) => {
    if (!uri.trim()) { Alert.alert("กรุณากรอก URL"); return; }
    const lower = uri.toLowerCase();
    setIsAudio(lower.endsWith(".mp3") || lower.endsWith(".aac") || lower.endsWith(".wav"));
    setActiveUri(uri.trim());
    setPlaying(false);
    setPosition(0);
    setLoading(true);
  };

  // ── pick local file ───────────────────────────────────────────────────────

  const pickLocalFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["video/*", "audio/*"],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        setInputUri(file.uri);
        load(file.uri);
      }
    } catch (e) {
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถเลือกไฟล์ได้");
    }
  };

  // ── status callback ───────────────────────────────────────────────────────

  const onStatus = (s: AVPlaybackStatus) => {
    if (!s.isLoaded) { if (s.error) { setLoading(false); } return; }
    setLoading(false);
    setPlaying(s.isPlaying);
    setDuration(s.durationMillis ?? 0);
    if (!seeking) setPosition(s.positionMillis ?? 0);
  };

  // ── controls ──────────────────────────────────────────────────────────────

  const togglePlay = async () => {
    if (!videoRef.current) return;
    playing ? await videoRef.current.pauseAsync() : await videoRef.current.playAsync();
  };

  const seek = async (v: number) => { await videoRef.current?.setPositionAsync(v); };
  const skip = async (sec: number) => { await seek(Math.max(0, Math.min(duration, position + sec * 1000))); };

  const applySpeed = async (v: number) => {
    setSpeed(v); setSpeedModal(false);
    await videoRef.current?.setRateAsync(v, true);
  };

  const onVolume = async (v: number) => {
    setVolume(v); setMuted(v === 0);
    await videoRef.current?.setVolumeAsync(v);
  };

  const toggleMute = async () => {
    const next = !muted; setMuted(next);
    await videoRef.current?.setIsMutedAsync(next);
  };

  const toggleLoop = async () => {
    const next = !looping; setLooping(next);
    await videoRef.current?.setIsLoopingAsync(next);
  };

  // ─── UI ───────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Header */}
        <View style={s.header}>
          <Text style={s.title}>🎬 Media Player</Text>
          <TouchableOpacity style={s.demoBtn} onPress={() => setDemoModal(true)}>
            <Text style={s.demoBtnTxt}>ตัวอย่างสื่อ</Text>
          </TouchableOpacity>
        </View>

        {/* Source Card */}
        <View style={s.card}>
          <Text style={s.label}>แหล่งที่มาของสื่อ</Text>

          {/* Tab */}
          <View style={s.tabRow}>
            {(["url", "local"] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[s.tab, sourceTab === t && s.tabActive]}
                onPress={() => setSourceTab(t)}
              >
                <Text style={[s.tabTxt, sourceTab === t && s.tabTxtActive]}>
                  {t === "url" ? "🔗 URL" : "📁 Local"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {sourceTab === "url" ? (
            <View style={s.row}>
              <TextInput
                value={inputUri}
                onChangeText={setInputUri}
                placeholder="https://example.com/video.mp4"
                placeholderTextColor={C.muted}
                style={s.input}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity style={s.loadBtn} onPress={() => load(inputUri)}>
                <Text style={s.loadBtnTxt}>▶</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={s.localBox}
              onPress={pickLocalFile}
            >
              <Text style={{ fontSize: 28 }}>📂</Text>
              <Text style={s.localTxt}>แตะเพื่อเลือกไฟล์</Text>
              <Text style={s.localSub}>MP4, MP3, MOV, AAC…</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Player */}
        {activeUri ? (
          <>
            {/* Video surface */}
            <View style={s.videoWrap}>
              {isAudio ? (
                <View style={s.audioBox}>
                  <Text style={{ fontSize: 48 }}>🎵</Text>
                  <Text style={s.audioTitle}>Audio Track</Text>
                  <Text style={s.audioSub} numberOfLines={1}>
                    {activeUri.split("/").pop()}
                  </Text>
                </View>
              ) : null}

              <Video
                ref={videoRef}
                source={{ uri: activeUri }}
                style={isAudio ? { width: 0, height: 0 } : s.video}
                resizeMode={ResizeMode.CONTAIN}
                onPlaybackStatusUpdate={onStatus}
                shouldPlay={false}
                isLooping={looping}
                isMuted={muted}
                volume={volume}
                rate={speed}
              />

              {loading && (
                <View style={s.loadOverlay}>
                  <ActivityIndicator color={C.red} size="large" />
                  <Text style={s.loadTxt}>กำลังโหลด…</Text>
                </View>
              )}
            </View>

            {/* Progress */}
            <View style={s.card}>
              <Slider
                value={seeking ? position : position}
                minimumValue={0}
                maximumValue={duration || 1}
                minimumTrackTintColor={C.red}
                maximumTrackTintColor="#2a2a2a"
                thumbTintColor={C.red}
                onSlidingStart={() => setSeeking(true)}
                onSlidingComplete={async (v) => { setSeeking(false); await seek(v); }}
                onValueChange={(v) => { if (seeking) setPosition(v); }}
                style={{ height: 32 }}
              />
              <View style={s.timeRow}>
                <Text style={s.timeTxt}>{fmt(position)}</Text>
                <Text style={s.timeTxt}>{fmt(duration)}</Text>
              </View>
            </View>

            {/* Main controls */}
            <View style={s.mainCtrl}>
              <TouchableOpacity style={s.skipBtn} onPress={() => skip(-10)}>
                <Text style={s.skipIcon}>⏮</Text>
                <Text style={s.skipLbl}>10s</Text>
              </TouchableOpacity>

              <TouchableOpacity style={s.playBtn} onPress={togglePlay}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.playIcon}>{playing ? "⏸" : "▶"}</Text>}
              </TouchableOpacity>

              <TouchableOpacity style={s.skipBtn} onPress={() => skip(10)}>
                <Text style={s.skipIcon}>⏭</Text>
                <Text style={s.skipLbl}>10s</Text>
              </TouchableOpacity>
            </View>

            {/* Secondary controls */}
            <View style={[s.card, s.row, { justifyContent: "space-around" }]}>
              <TouchableOpacity style={s.ctrl} onPress={toggleMute}>
                <Text style={[s.ctrlIcon, muted && { color: C.red }]}>
                  {muted ? "🔇" : "🔊"}
                </Text>
                <Text style={s.ctrlLbl}>เสียง</Text>
              </TouchableOpacity>

              <TouchableOpacity style={s.ctrl} onPress={() => setSpeedModal(true)}>
                <View style={s.speedBadge}>
                  <Text style={s.speedTxt}>{speed}×</Text>
                </View>
                <Text style={s.ctrlLbl}>ความเร็ว</Text>
              </TouchableOpacity>

              <TouchableOpacity style={s.ctrl} onPress={toggleLoop}>
                <Text style={[s.ctrlIcon, looping && { color: C.red }]}>🔁</Text>
                <Text style={s.ctrlLbl}>วนซ้ำ</Text>
              </TouchableOpacity>

              <TouchableOpacity style={s.ctrl} onPress={() => setQualityModal(true)}>
                <Text style={s.ctrlIcon}>🎞</Text>
                <Text style={s.ctrlLbl}>{quality}</Text>
              </TouchableOpacity>
            </View>

            {/* Volume */}
            <View style={s.card}>
              <Text style={s.label}>ระดับเสียง — {Math.round(volume * 100)}%</Text>
              <View style={s.row}>
                <Text style={{ color: C.muted }}>🔈</Text>
                <Slider
                  value={volume}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor={C.red}
                  maximumTrackTintColor="#2a2a2a"
                  thumbTintColor={C.red}
                  onValueChange={onVolume}
                  style={{ flex: 1, marginHorizontal: 8 }}
                />
                <Text style={{ color: C.muted }}>🔊</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={s.empty}>
            <Text style={{ fontSize: 48 }}>🎬</Text>
            <Text style={s.emptyTxt}>กรอก URL หรือเลือกไฟล์ด้านบน{"\n"}เพื่อเริ่มเล่นสื่อ</Text>
          </View>
        )}
      </ScrollView>

      {/* Speed Modal */}
      <Modal visible={speedModal} transparent animationType="slide" onRequestClose={() => setSpeedModal(false)}>
        <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={() => setSpeedModal(false)} />
        <View style={s.sheet}>
          <View style={s.sheetHandle} />
          <Text style={s.sheetTitle}>ความเร็วในการเล่น</Text>
          {SPEED_OPTIONS.map((v) => (
            <TouchableOpacity key={v} style={s.sheetRow} onPress={() => applySpeed(v)}>
              <Text style={[s.sheetRowTxt, speed === v && { color: C.red }]}>{v}×</Text>
              {speed === v && <Text style={{ color: C.red }}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Quality Modal */}
      <Modal visible={qualityModal} transparent animationType="slide" onRequestClose={() => setQualityModal(false)}>
        <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={() => setQualityModal(false)} />
        <View style={s.sheet}>
          <View style={s.sheetHandle} />
          <Text style={s.sheetTitle}>คุณภาพวิดีโอ</Text>
          {QUALITY_OPTIONS.map((q) => (
            <TouchableOpacity key={q} style={s.sheetRow} onPress={() => { setQuality(q); setQualityModal(false); }}>
              <Text style={[s.sheetRowTxt, quality === q && { color: C.red }]}>{q}</Text>
              {quality === q && <Text style={{ color: C.red }}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Demo Modal */}
      <Modal visible={demoModal} transparent animationType="slide" onRequestClose={() => setDemoModal(false)}>
        <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={() => setDemoModal(false)} />
        <View style={s.sheet}>
          <View style={s.sheetHandle} />
          <Text style={s.sheetTitle}>ตัวอย่างสื่อ</Text>
          {DEMO_SOURCES.map((src) => (
            <TouchableOpacity
              key={src.uri}
              style={s.sheetRow}
              onPress={() => { setInputUri(src.uri); setDemoModal(false); load(src.uri); }}
            >
              <Text style={{ fontSize: 20 }}>{src.isAudio ? "🎵" : "🎬"}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.sheetRowTxt}>{src.label}</Text>
                <Text style={s.localSub} numberOfLines={1}>{src.uri.split("/").pop()}</Text>
              </View>
              <Text style={{ color: C.muted }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingTop: Platform.OS === "android" ? 40 : 16, paddingBottom: 12,
  },
  title: { color: C.text, fontSize: 22, fontWeight: "700" },
  demoBtn: { backgroundColor: "#1e1e1e", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: C.border },
  demoBtnTxt: { color: C.dim, fontSize: 12 },

  card: { marginHorizontal: 16, marginBottom: 12, backgroundColor: C.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.border },
  label: { color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center" },

  tabRow: { flexDirection: "row", backgroundColor: C.bg, borderRadius: 12, padding: 4, marginBottom: 12 },
  tab: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: C.red },
  tabTxt: { color: C.muted, fontSize: 14, fontWeight: "500" },
  tabTxtActive: { color: C.text },

  input: { flex: 1, backgroundColor: C.bg, color: C.text, fontSize: 13, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: "#2a2a2a", marginRight: 8 },
  loadBtn: { backgroundColor: C.red, width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  loadBtnTxt: { color: C.text, fontSize: 16 },

  localBox: { borderWidth: 1, borderColor: "#333", borderStyle: "dashed", borderRadius: 12, paddingVertical: 32, alignItems: "center" },
  localTxt: { color: C.muted, marginTop: 8, fontSize: 14 },
  localSub: { color: "#333", fontSize: 11, marginTop: 4 },

  videoWrap: { marginHorizontal: 16, marginBottom: 12, borderRadius: 16, overflow: "hidden", backgroundColor: "#000", aspectRatio: 16 / 9 },
  video: { flex: 1 },
  audioBox: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: C.card },
  audioTitle: { color: C.text, fontWeight: "600", marginTop: 8 },
  audioSub: { color: C.muted, fontSize: 12, marginTop: 4, paddingHorizontal: 24 },
  loadOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)", alignItems: "center", justifyContent: "center" },
  loadTxt: { color: C.text, fontSize: 12, marginTop: 8 },

  timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: -4 },
  timeTxt: { color: C.muted, fontSize: 12 },

  mainCtrl: { flexDirection: "row", alignItems: "center", justifyContent: "center", columnGap: 32, marginBottom: 12 },
  skipBtn: { alignItems: "center" },
  skipIcon: { fontSize: 26, color: C.dim },
  skipLbl: { color: C.muted, fontSize: 10, marginTop: 2 },
  playBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: C.red, alignItems: "center", justifyContent: "center" },
  playIcon: { fontSize: 26, color: C.text },

  ctrl: { alignItems: "center", rowGap: 4 },
  ctrlIcon: { fontSize: 22, color: C.dim },
  ctrlLbl: { color: C.muted, fontSize: 10 },
  speedBadge: { backgroundColor: "rgba(229,9,20,0.15)", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  speedTxt: { color: C.red, fontWeight: "700", fontSize: 13 },

  empty: { alignItems: "center", paddingVertical: 60 },
  emptyTxt: { color: C.muted, textAlign: "center", marginTop: 12, lineHeight: 22 },

  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  sheet: { backgroundColor: C.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingBottom: 40, paddingTop: 12, borderTopWidth: 1, borderColor: C.border },
  sheetHandle: { width: 40, height: 4, backgroundColor: "#333", borderRadius: 2, alignSelf: "center", marginBottom: 16 },
  sheetTitle: { color: C.text, fontWeight: "600", fontSize: 16, marginBottom: 12 },
  sheetRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#1e1e1e" },
  sheetRowTxt: { color: C.text, fontSize: 14 },
});