import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useUser } from "../context/Context.js"
import { useState, useRef, useEffect } from 'react'
import QRCode from "react-qr-code";


Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '1cm',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        boxShadow: '0 0 5px 1px rgb(175, 175, 175)',

    },
 

  


 


 
   
    box: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '0px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(255, 255, 255)',
       height: '100%',
       width: '100%',
        zIndex: '100',
    },
    text: {
        width: '50%',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: 'white',
        margin: '32px 0'

    }
})

const PDFView = () => {
    const { image, setAlbunImage, templates, numeration, qr, dataUrl, uuid } = useUser()
    console.log(dataUrl)
    return (
        <PDFViewer>

            <Document>
                <Page size='A4' style={styles.body} >
                    <View style={styles.box} >
                    {uuid.map((i, index) => <Text key={index} style={styles.text}>{i} </Text>)}
                    </View>
                </Page>
               
            </Document>
        </PDFViewer>
    )
}

export default PDFView















