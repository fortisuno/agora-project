import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PedidoPropuesta = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Text style={styles.sectionTitle}>Propuesta</Text>
        <View style={styles.defaultContainer}>
            <Input placeholder="Monto" label="Monto" />
            <Input placeholder="Cantidad" label="Cantidad" />
            <Input placeholder="Unidad" label="Unidad" />
            <Button title="Guardar" containerStyle={{ width: "100%" }} />
            <Button title="Cancelar" containerStyle={{ width: "100%" }} type="clear" />
        </View>
    </ScrollView>
  )
}

export default PedidoPropuesta
