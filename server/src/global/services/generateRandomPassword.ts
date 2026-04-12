//Random Password Generation Service

import * as bcrypt from 'bcrypt'
class generateRandomPasswordService{
    static async genereateHashPassword(teacherName:string){
        const randomPassword = Math.floor(10000 + Math.random() * 30000)
        const passwordData = {
            hashPassword: await bcrypt.hash(`${randomPassword} ${teacherName}`, 12), //stored in database
            plainPassword: `${randomPassword} ${teacherName}` //gives to teacher plain password
        };

        return passwordData;
    };
};

export default generateRandomPasswordService;