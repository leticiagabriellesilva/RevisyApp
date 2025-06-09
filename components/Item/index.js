import { View, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./styles"

type ItemData = {
  done: boolean
  description: string
}

type Props = {
  data: ItemData
  onStatus: () => void
  onRemove: () => void
}

export function Item({ data, onStatus, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <MaterialIcons
          name={data.done ? "check-box" : "check-box-outline-blank"}
          size={18}
          color="#828282"
        />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity onPress={onRemove}>
        <MaterialIcons name="delete" size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  )
}
