import { FC } from "react"
import { Image, Text, View } from "react-native"

import { AUTHORISED_ID_PREFIX } from "./lib/constants"
import { styles, CONTAINER_PADDING } from "./lib/styles"
import type { CustomCardProps } from "./lib/types"
import { Images } from "../../../../assets/Images/wholeSeller"

const CustomCard: FC<CustomCardProps> = (data: any) => {
  return (
    <View style={{ padding: CONTAINER_PADDING }}>
      <View style={styles.container}>
        <Image source={Images.SoyaMilk} style={styles.image} />
        <View style={styles.rightPart}>
          <Text style={styles.helperText1}>
            {AUTHORISED_ID_PREFIX}
            {data?.value?.product_id}
          </Text>
          <Text style={styles.helperText2}>{data?.value?.product_desc}</Text>
          <Text style={styles.helperText3}>{data?.value?.price}</Text>
        </View>
      </View>
    </View>
  )
}

export default CustomCard
