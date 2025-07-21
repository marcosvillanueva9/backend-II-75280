import businessModel from "../models/business.model.js";

export default class Business {
    getBusinesses = async () => {
        try {
            const businesses = await businessModel.find();
            return businesses;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getBusinessById = async (id) => {
        try {
            const business = await businessModel.findOne({ _id: id });
            return business;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    createBusiness = async (businessData) => {
        try {
            const newBusiness = await businessModel.create(businessData);
            return newBusiness;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateBusiness = async (id, businessData) => {
        try {
            const updatedBusiness = await businessModel.updateOne({ _id: id }, businessData);
            return updatedBusiness;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}