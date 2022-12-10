import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useUser } from "../context/Context.js"

Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        alignItems: 'center',
        justifyItems: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 0 5px 1px rgb(175, 175, 175)',
        width: '794px',
        height: '1123px',
    },
    form: {
        boxSizing: 'content-box',
        position: 'relative',
        width: '189px',
        height: '303px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border:  '5px solid rgb(229, 229, 229)',
      },
      image: {
        position: 'absolute',
        backgroundColor: 'rgb(255, 255, 255)',
      }
})

const PDFView = () => {
    const { image, setAlbunImage } = useUser()
    const id = 1
    const [arrA, setArrA] = useState([[`A${id}`, `B${id}`, `C${id}`, `D${id}`, `E${id}`, `F${id}`, `G${id}`, `H${id}`, `I${id}`]])

    return (
        <PDFViewer>
            <Document>
                <Page style={styles.body} >
                    {arrA.map((i, index) =>
                        <View className={styles.form} key={i}>
                            {image[i] && <Image src={image[i].url}  style={{ ...styles.image, transform: `rotate(${dataOrientations[index] == 'h' ? '90' : '0'}deg )`, objectFit: 'cover', backgroundImage: `url(${image[i].url})`, width: dataOrientations[index] == 'h' ? '303px' : '189px', height: dataOrientations[index] == 'h' ? '189px' : '303px' }} />}
                            {/* <span className={style.heart} style={{transform: `rotate(${dataOrientations[index] == 'h' ? '90': '0' }deg )`}}>{numeration[index]}</span> */}
                        </View>)}
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default PDFView