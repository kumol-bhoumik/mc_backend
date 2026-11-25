const Saving = require('../models/Saving');
class SavingService {
    async findSaving(query) {
        return await Saving.findOne(query);
    }

    async createSaving(savingData) {
        const newSaving = new Saving(savingData);
        return await newSaving.save();
    }

    async registerSaving(savingData) {
        const newSaving = new Saving(savingData);
        return await newSaving.save();
    }

    async updateSaving(query, updateData) {
        const saving = await Saving.findOneAndUpdate(query, updateData, { new: true });
        return saving;
    }

    async deleteSaving(query) {
        const saving = await Saving.findOneAndDelete(query);
        return saving;
    }

    async getSaving(query) {
        const saving = await Saving.aggregate([{
            $match: query
        },{
            $sort: {
                _id: -1
            }
        }]);
        return saving;
    }
}

module.exports = new SavingService();