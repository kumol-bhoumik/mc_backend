const savingService = require("../services/SavingService");
const { success, error } = require("../utils/httpresponse");
const moment = require("moment-timezone");
class SavingController{
    async addSaving(req, res, next){
        try{
            const userId = req.user.id;
            let data = await savingService.createSaving({...req.body, created_by: userId});
            return success(res, "successfully created ", data, 201);
        }catch(err){
            return error(res, err);
        }
    }

    async loadSaving(req, res, next){
        try{
            let query = {};
            let {org_id, user_id} = req.params;
            query.org_id = org_id;
            if(!user_id) user_id = req.query.user;
            if(user_id) query.user_id = user_id;
            let savingData = await savingService.getSaving(query);
            let total = 0;
            savingData = savingData.map(s=>{
                total += s.amount;
                return {
                    date: moment(s.month || s.date).format("YYYY-MM-DD"),
                    amount: s.amount,
                    amountAfter: total,
                    method: "cash",
                    note: ""
                }
            })
            return success(res, "success", savingData);
        } catch(err){
            return error(res, err);
        }
    }
}

module.exports = new SavingController();