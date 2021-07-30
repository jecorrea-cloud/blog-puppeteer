const puppeteer = require('puppeteer');

(async () =>{
    try{
        
        const browser = await puppeteer.launch();
          
        const webpage = await browser.newPage()
        await webpage.goto('https://www.goal.com/en/premier-league/table/2kwbbcootiqqgmrzs6o5inle5')
        // const html = await webpage.content()
        // console.log(html)

        let standings = await webpage.evaluate(()=>{

            const teams = [...document.querySelectorAll('.widget-match-standings__team--full-name')].map((teamNode) => teamNode.innerText) 
            const points = [...document.querySelectorAll('.widget-match-standings__pts')].map((pointsNode) => pointsNode.innerText) 
            
            return teams.map( (team, i) => ({team: team, points: points[i+1]}) )
        })

        console.log(standings)
        browser.close()

    }catch(err){
        console.log(err);
    }
})()
