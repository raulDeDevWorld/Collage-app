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
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 0 5px 1px rgb(175, 175, 175)',
    },
    form: {
        boxSizing: 'border-box',
        position: 'relative',
        width: '6cm',
        height: '8cm',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1.5mm solid rgb(229, 229, 229)',
        margin: '.5mm'
    },


    image: {
        boxSizing: 'border-box',
        position: 'relative',
        backgroundColor: 'red',
        objectFit: 'cover'
    },
    heart: {
        height: '30px',
        width: '30px',
        textAlign: 'center',
        position: 'absolute',
        fontSize: '12px',
        color: 'rgb(0, 0, 0)',
        border: 'none',
        padding: '5px',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }
})

const PDFView = () => {
    const { image, setAlbunImage, templates, numeration, qr } = useUser()

    return (
        <PDFViewer>

            <Document>

                <Page size='A4' style={styles.body} >
                    {templates[0].map((i, index) =>
                        <View style={styles.form} key={i}>

                            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[0][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[0][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (0 * 9)]}</Text> </View>

                            {image[`Image-${numeration[index + (0 * 9)]}`] && <Image src={image[`Image-${numeration[index + (0 * 9)]}`].url} style={{ ...styles.image, transform: `rotate(${templates[0][index] == 'h' ? '90' : '0'}deg )`, objectFit: 'cover', width: templates[0][index] == 'h' ? '77mm' : '57mm', height: templates[0][index] == 'h' ? '57mm' : '77mm' }} />}
                        </View>)}
                </Page>
                <Page size='A4' style={{...styles.body, flexDirection: 'row-reverse'}} >
                    {templates[0].map((i, index) =>
                        <View style={styles.form} key={i}>

                            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[0][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[0][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (0 * 9)]}</Text> </View>
                        </View>)}
                </Page>



                <Page size='A4' style={styles.body} >
                    {templates[1].map((i, index) =>
                        <View style={styles.form} key={i}>
                            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[1][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[1][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (1 * 9)]}</Text> </View>

                            {image[`Image-${numeration[index + (1 * 9)]}`] && <Image src={image[`Image-${numeration[index + (1 * 9)]}`].url} style={{ ...styles.image, transform: `rotate(${templates[1][index] == 'h' ? '90' : '0'}deg )`, objectFit: 'cover', width: templates[1][index] == 'h' ? '77mm' : '57mm', height: templates[1][index] == 'h' ? '57mm' : '77mm' }} />}
                        </View>)}
                </Page>
                <Page size='A4' style={{...styles.body, flexDirection: 'row-reverse'}} >
                    {templates[1].map((i, index) =>
                        <View style={styles.form} key={i}>
                            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[1][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[1][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (1 * 9)]}</Text> </View>
                        </View>)}
                </Page>




                <Page size='A4' style={styles.body} >
                    {templates[2].map((i, index) =>
                        <View style={{
                            ...styles.form,
                            height: index > 6 ? '83mm' : '80mm',
                            width: index > 6 ? '63mm' : '60mm'
                        }} key={i}>
                            <Image src='/heart.png' style={{
                                ...styles.heart,
                                transform: `rotate(${templates[2][index] == 'h' ? '90' : '0'}deg )`,
                            }}/>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[2][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (2 * 9)]}</Text> </View>
                            {image[`Image-${numeration[index + (2 * 9)]}`] &&
                                <Image src={image[`Image-${numeration[index + (2 * 9)]}`].url} style={{
                                    ...styles.image,
                                    transform: `rotate(${templates[2][index] == 'h' ? '90' : '0'}deg )`,
                                    objectFit: 'cover',
                                    width: templates[2][index] == 'h' ? (index > 6 ? '80mm' : '77mm') : (index > 6 ? '60mm' : '57mm'),
                                    height: templates[2][index] == 'h' ? (index > 6 ? '60mm' : '57mm') : (index === 8 ? '80mm' : '77mm')
                                }} />}
                        </View>)}
                </Page>
                <Page size='A4' style={{...styles.body, flexDirection: 'row-reverse'}} >
                    {templates[2].map((i, index) =>
                        <View style={styles.form} key={i}>
                            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[2][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[2][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (2 * 9)]}</Text> </View>
                        </View>)}
                </Page>




                <Page size='A4' style={styles.body} >
                    {templates[3].map((i, index) =>
                        <View style={styles.form} key={i}>
                            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[3][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[3][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (3 * 9)]}</Text> </View>

                            {image[`Image-${numeration[index + (3 * 9)]}`] && <Image src={image[`Image-${numeration[index + (3 * 9)]}`].url} style={{ ...styles.image, transform: `rotate(${templates[3][index] == 'h' ? '90' : '0'}deg )`, objectFit: 'contain', width: templates[3][index] == 'h' ? '77mm' : '57mm', height: templates[3][index] == 'h' ? '57mm' : '77mm' }} />}
                        </View>)}

                    {/* <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={qr}
                        viewBox={`0 0 256 256`}
                    /> */}
                    <View style={styles.form} >
                        <Image src='/qr.jpg' style={{ ...styles.image, transform: `rotate(0deg)`, objectFit: 'cover', width: '47mm', height: '77mm' }} />
                    </View>
                </Page>
                <Page size='A4' style={{...styles.body, flexDirection: 'row-reverse'}} >
                    {templates[3].map((i, index) =>
                        <View style={styles.form} key={i}>
                            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[3][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[3][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (3 * 9)]}</Text> </View>
                        </View>)}
                </Page>







                <Page size='A4' style={styles.body} >
                    {templates[4].map((i, index) =>
                        <View style={{...styles.form, width: '80mm', height: '60mm'}} key={i}>
                            <Image src='/heart.png' style={{ ...styles.heart , transform: `rotate(${templates[4][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[4][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (4 * 9)]}</Text> </View>
                            {image[`Image-${numeration[index + (4 * 9)]}`] && <Image src={image[`Image-${numeration[index + (4 * 9)]}`].url} style={{ ...styles.image, transform: `rotate(${templates[4][index] == 'h' ? '90' : '0'}deg )`, objectFit: 'cover', width: templates[4][index] == 'v' ? '77mm' : '77mm', height: templates[4][index] == 'v' ? '57mm' : '57mm' }} />}
                        </View>)}
                </Page>
                <Page size='A4' style={{...styles.body, flexDirection: 'row-reverse'}} >
                    {templates[4].map((i, index) =>
                        <View style={{...styles.form, width: '80mm', height: '60mm'}} key={i}>
                            <Image src='/heart.png' style={{ ...styles.heart, transform: `rotate(${templates[4][index] == 'h' ? '90' : '0'}deg )` }}></Image>
                            <View style={{ ...styles.heart, transform: `rotate(${templates[4][index] == 'h' ? '90' : '0'}deg )` }}>  <Text style={{ ...styles.heart, fontSize: '10px', paddingTop: '8px' }}>{numeration[index + (4 * 9)]}</Text> </View>
                        </View>)}
                </Page>

            </Document>
        </PDFViewer>
    )
}

export default PDFView








// {arrA.map((i, index) =>
//     <View className={styles.form} key={i}>
//          <Image src={`${image[i].url}`} style={{...styles.image, transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`, objectFit: 'cover' , backgroundImage: `url(${image[i].url})`,   width: dataOrientations[index] == 'h' ? '303px' : '189px', height: dataOrientations[index] == 'h' ? '189px' : '303px' }}/>
//     </View>)}
{/* <span className={style.heart} style={{transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`}}>{numeration[index]}</span> */ }
