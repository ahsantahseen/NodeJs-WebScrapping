//Importing Pupprteer
const puppeteer=require('puppeteer');
//Running async function
(async ()=>{
    //Defining Essentials
    let movieURL='https://www.imdb.com/title/tt4154796/?ref_=nv_sr_srsg_0'
    let browser= await puppeteer.launch({headless:true});
    let page=await browser.newPage();
    //Scarpping Data 
    await page.goto(movieURL,{waitUntil:'networkidle2'});
    let data = await page.evaluate(()=>{
        let movieName=document.querySelector('div[class="title_wrapper"]> h1').innerText
        let rating=document.querySelector('span[itemprop="ratingValue"]').innerText
        
        return{
            movieName,
            rating
        }
    });
//Logging Data
console.log(data)
debugger;
await browser.close();
}   
)();