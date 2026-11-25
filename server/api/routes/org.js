const express = require('express');
const router = express.Router();
const OrgController = require('../../controllers/OrgController');
const AuthService = require('../../services/AuthService');
router.post('/create', AuthService.checkAuth, OrgController.createOrg);
router.get('/orgs/mine', AuthService.checkAuth, OrgController.getMyOrg);
router.get('/:id/members', AuthService.checkAuth, OrgController.getOrgMembers);
router.get('/orgs', OrgController.getOrgs);
router.get('/orgs/:id', OrgController.getOrgById);
router.put('/orgs/:id', AuthService.checkAuth, OrgController.updateOrg);
router.delete('/orgs/:id', AuthService.checkAuth, OrgController.deleteOrg);

module.exports = router;
