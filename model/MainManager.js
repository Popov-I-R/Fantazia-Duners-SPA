class MainManager {

    constructor() {
        this.allDuners = []
       
    }

    add(duner) { 
        if (this.allDuners.indexOf(duner) === -1) {
            this.allDuners.push(duner) 
        }
    }



    filter(text) {

        let filtered = []
        text = text.toLowerCase() // За да може да работи търсачката и с главни и с малки букви 
        for (let i = 0; i < this.allDuners.length; i++) {
            if (this.allDuners[i].name.toLowerCase().includes(text.toLowerCase())) {
                filtered.push(this.allDuners[i])
            }
            
        }
        return filtered;
    }

    
    // addCelebrity(match) { 
    //     if (this.allDuners.indexOf(match) === -1) { 
    //         this.allDuners.unshift(match) 
    //     }
    // }
    

}