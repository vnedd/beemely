import { StatusCodes } from "http-status-codes";
import WishListService from "../../services/client/wishlist.service.js";
import { SuccessResponse } from "../../utils/response.js";


export class WishListController {
  static removeAllItems = async (req, res, next) => {
    try {
      const wishList = await WishListService.removeAll(req);
  
      SuccessResponse(res, StatusCodes.OK, 'Remove all items in wishlist successfully', wishList);
    } catch (error) {
      next(error);
    }
  };

  static getall = async (req, res, next) => {
    try {
      const { metaData, others } = await WishListService.getallItems(req);
  
      SuccessResponse(res, StatusCodes.OK, 'get all items in wishlist successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };


  static updateItemsAdd = async (req, res, next) => {
    try {
      const wishList = await WishListService.updateItemsAdd(req);
  
      SuccessResponse(res, StatusCodes.OK, 'Update wish list successfully', wishList);
    } catch (error) {
      next(error);
    }
  };
  static updateItemsRemove = async (req, res, next) => {
    try {
      const wishList = await WishListService.updateItemsRemove(req);
  
      SuccessResponse(res, StatusCodes.OK, 'Update wish list successfully', wishList);
    } catch (error) {
      next(error);
    }
  };
}