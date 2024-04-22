const axios = require('axios');
const url = process.argv[2];

function extractProducts(content) {
    const productRegex=/<div class="jsx-420cefab3c28f825 ">(.*?)<\/a><\/div>/mg

    const productsArray=content.match(productRegex)

    const nameRegex=/product-name">([^<>]+)<\/h2>/
    const priceRegex=/product-price-text">([^<>]+)<\/div>/
    const imageRegex=/<img\ssrcSet=".*?"\ssrc="(.*?)"/

    const productDetailsArray=[];

    productsArray.map((product,i)=>{
        const priceMatch = priceRegex.exec(product);
        const nameMatch = nameRegex.exec(product);
        const imageMatch= imageRegex.exec(product)

        const priceCountRegex=/(?:از)?\s?(.*?)\sتومان/
        const price=priceCountRegex.exec(priceMatch[1])

        const productDetails={
            title:nameMatch[1],
            price:price[1],
            img:imageMatch[1]
        }

        productDetailsArray.push(productDetails)
    })

    return productDetailsArray
}

axios.get(url).then((res) => {
    console.log(extractProducts(res.data))
});



