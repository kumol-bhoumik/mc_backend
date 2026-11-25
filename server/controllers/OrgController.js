const Org = require('../models/Org');
const { success, error, badRequest } = require('../utils/httpresponse');
const UserService = require('../services/UserService');
class OrgController {
    async createOrg(req, res) {
        try {
            const { name, next, phone, address, regNo, users } = req.body;
            if (!name) {
                return badRequest(res, 'Organization name is required');
            }
            let orgs = await Org.find({}).sort({_id: -1}).limit(1);
            let id = "10001";
            if (orgs.length > 0) {
                id = (+orgs[0].id + 1).toString();
            }
            const org = new Org({ name, id, next, phone, address, regNo, users });
            await org.save();
            await UserService.updateUser({ id: req.user.id }, { $push: { org: { org_id: id, role: 'admin' } } });
            return success(res, 'Organization created successfully', org, 201);
        } catch (err) {
            return error(res, err);
        }
    }

    async getOrgs(req, res) {
        try {
            const orgs = await Org.find({});
            return success(res, 'Organizations retrieved successfully', orgs);
        } catch (err) {
            return error(res, err);
        }
    }

    async getOrgById(req, res) {
        try {
            const { id } = req.params;
            const org = await Org.findOne({ id });
            if (!org) {
                return badRequest(res, 'Organization not found');
            }
            return success(res, 'Organization retrieved successfully', org);
        } catch (err) {
            return error(res, err);
        }
    }

    async updateOrg(req, res) {
        try {
            const { id } = req.params;
            const { name, next, phone, address, regNo, users } = req.body;
            const org = await Org.findOne({ id });
            if (!org) {
                return badRequest(res, 'Organization not found');
            }
            if (name) org.name = name;
            if (next) org.next = next;
            if (phone) org.phone = phone;
            if (address) org.address = address;
            if (regNo) org.regNo = regNo;
            if (users) org.users = users;
            await org.save();
            return success(res, 'Organization updated successfully', org);
        } catch (err) {
            return error(res, err);
        }
    }

    async deleteOrg(req, res) {
        try {
            const { id } = req.params;
            const org = await Org.findOneAndDelete({ id });
            if (!org) {
                return badRequest(res, 'Organization not found');
            }
            return success(res, 'Organization deleted successfully', org);
        } catch (err) {
            return error(res, err);
        }
    }

    async getMyOrg(req, res) {
        try {
            const userId = req.user.id;
            const user = await UserService.findUser({ id: userId });
            if (!user) {
                return badRequest(res, 'User not found');
            }
            const orgs = user.org.map(org => org.org_id);
            if (orgs.length === 0) {
                return badRequest(res, 'No organization found for the user');
            }
            const org = await Org.findOne({ id: { $in: orgs } });
            if (!org) {
                return badRequest(res, 'Organization not found for the user');
            }
            return success(res, 'Organization retrieved successfully', org);
        } catch (err) {
            return error(res, err);
        }
    }

    async getOrgMembers(req, res) {
        try {
            const { id } = req.params;
            const members = await UserService.getUser({ "org.org_id": id });
            if (!members) {
                return badRequest(res, 'Organization members not found');
            }
            return success(res, 'Organization members retrieved successfully', members);
        } catch (err) {
            return error(res, err);
        }
    }
}

module.exports = new OrgController();