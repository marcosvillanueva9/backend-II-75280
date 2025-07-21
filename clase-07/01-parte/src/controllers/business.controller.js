import Business from "../dao/classes/business.dao.js";

const businessService = new Business();

class BusinessController {

    static async getBusinesses(req, res) {
        const businesses = await businessService.getBusinesses();
        if (!businesses) res.status(500).send({status: 'error', message: 'Failed to retrieve businesses'});
        else if (businesses.length === 0) res.status(404).send({status: 'error', message: 'No businesses found'});
        else res.send({status: 'success', result: businesses});
    }

    static async getBusinessById(req, res) {
        const { id } = req.params;
        const business = await businessService.getBusinessById(id);
        if (!business) res.status(404).send({status: 'error', message: 'Business not found'});
        else res.send({status: 'success', result: business});
    }

    static async createBusiness(req, res) {
        const businessData = req.body;
        const newBusiness = await businessService.createBusiness(businessData);
        if (!newBusiness) res.status(500).send({status: 'error', message: 'Failed to create business'});
        else res.send({status: 'success', result: newBusiness});
    }

    static async addProduct(req, res) {
        const { id } = req.params;
        const productData = req.body;
        let business = await businessService.getBusinessById(id);
        if (!business) {
            res.status(404).send({status: 'error', message: 'Business not found'});
            return;
        }

        business.products.push(productData);

        
        const updatedBusiness = await businessService.updateBusiness(id, business);
        if (!updatedBusiness) res.status(500).send({status: 'error', message: 'Failed to add product to business'});
        else res.send({status: 'success', result: updatedBusiness});
    }
}

export default BusinessController;