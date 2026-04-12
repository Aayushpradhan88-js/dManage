class RandomInstituteNumber{
    static generateInstituteRandomNumbers(){
        return Math.floor(10000 + Math.random() * 30000)
    };
};

export default RandomInstituteNumber;