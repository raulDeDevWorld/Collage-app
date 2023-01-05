import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";




export default function Figure({ styles }) {




    return (
        <View style={styles} >
            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[0][index] == 'h' ? '90' : '0'}deg )` }}></Image>
            <View style={{ ...styles.heart, transform: `rotate(${templates[0][index] == 'h' ? '90' : '0'}deg )` }}>
                <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '16px' }}>{numeration[index + (0 * 9)]}</Text>
            </View>
            {image[`Image-${numeration[index + (0 * 9)]}`] && <Image src={image[`Image-${numeration[index + (0 * 9)]}`].url} style={{ ...styles.image, transform: `rotate(${templates[0][index] == 'h' ? '90' : '0'}deg )`, objectFit: 'cover', width: templates[0][index] == 'h' ? '77mm' : '57mm', height: templates[0][index] == 'h' ? '57mm' : '77mm' }} />}
        </View>

    )
}


