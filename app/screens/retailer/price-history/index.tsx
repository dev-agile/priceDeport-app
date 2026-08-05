import { ScrollView, Text, View } from "react-native"

import { HeaderComponent } from "@/components/common-components"

import { usePriceHistory } from "./hooks/use-price-history"
import { UI_TEXT } from "./lib/constants"
import { styles } from "./lib/styles"

export default function PriceHistory() {
  const { peerGroups, rows, productId } = usePriceHistory()

  return (
    <View style={styles.container}>
      <HeaderComponent value={UI_TEXT.HEADER_TITLE} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>{UI_TEXT.HEADER_TITLE}</Text>

        <View style={styles.tableCard}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeadCell, styles.tableHeadDateCell]}>
              {UI_TEXT.TABLE_DATE}
            </Text>
            {peerGroups.map((group) => (
              <Text key={`head-${group}`} style={styles.tableHeadCell}>
                {group}
              </Text>
            ))}
          </View>

          {rows.length === 0 ? (
            <Text style={styles.emptyText}>{UI_TEXT.TABLE_EMPTY}</Text>
          ) : (
            rows.map((row, index) => {
              const isLast = index === rows.length - 1
              return (
                <View
                  key={`${row.date}-${index}`}
                  style={[styles.tableRow, isLast ? styles.tableRowLast : null]}
                >
                  <Text style={[styles.tableRowCell, styles.tableRowDateCell]}>{row.date}</Text>
                  {peerGroups.map((group) => (
                    <Text key={`${row.date}-${group}`} style={styles.tableRowCell}>
                      {row.prices[group]}
                    </Text>
                  ))}
                </View>
              )
            })
          )}
        </View>

        <View style={styles.footnoteCard}>
          <Text style={styles.footnoteText}>
            {UI_TEXT.FOOTNOTE} {productId}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
