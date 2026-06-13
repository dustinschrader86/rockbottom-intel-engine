import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function ResultsScreen({ route }) {
  const { results } = route.params;

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const Item = ({ label, value }) => (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value || "—"}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analysis Results</Text>

      {/* Summary */}
      <Section title="Summary">
        <Text style={styles.summary}>{results.summary}</Text>
      </Section>

      {/* Extracted Entities */}
      <Section title="Extracted Entities">
        {results.entities?.length > 0 ? (
          results.entities.map((e, i) => (
            <Item key={i} label={e.type} value={e.value} />
          ))
        ) : (
          <Text style={styles.empty}>No entities detected</Text>
        )}
      </Section>

      {/* On‑Chain Data */}
      <Section title="On‑Chain Data">
        {results.onchain ? (
          <>
            <Item label="Token Name" value={results.onchain.tokenName} />
            <Item label="Symbol" value={results.onchain.symbol} />
            <Item label="Supply" value={results.onchain.supply} />
            <Item label="Holders" value={results.onchain.holders} />
          </>
        ) : (
          <Text style={styles.empty}>No on‑chain data</Text>
        )}
      </Section>

      {/* Warnings */}
      <Section title="Warnings">
        {results.warnings?.length > 0 ? (
          results.warnings.map((w, i) => (
            <Text key={i} style={styles.warning}>⚠️ {w}</Text>
          ))
        ) : (
          <Text style={styles.empty}>No warnings</Text>
        )}
      </Section>

      {/* Raw JSON */}
      <Section title="Raw JSON">
        <ScrollView horizontal style={styles.jsonBox}>
          <Text style={styles.jsonText}>
            {JSON.stringify(results, null, 2)}
          </Text>
        </ScrollView>
      </Section>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Analyze Another Screenshot</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d", padding: 20 },
  title: { fontSize: 28, color: "#fff", fontWeight: "700", marginBottom: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 20, color: "#4caf50", marginBottom: 10, fontWeight: "600" },
  summary: { color: "#ddd", fontSize: 16, lineHeight: 22 },
  item: { marginBottom: 10 },
  itemLabel: { color: "#888", fontSize: 14 },
  itemValue: { color: "#fff", fontSize: 16, fontWeight: "500" },
  warning: { color: "#ff5252", fontSize: 15, marginBottom: 5 },
  empty: { color: "#555", fontStyle: "italic" },
  jsonBox: {
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  jsonText: { color: "#bbb", fontSize: 12, fontFamily: "Courier" },
  backButton: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  backText: { color: "#fff", fontSize: 16 },
});

