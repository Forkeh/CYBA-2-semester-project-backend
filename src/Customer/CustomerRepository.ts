import prisma from "../PrismaClient.js";
import {IPagination} from "../../shared.types.js";
import {ICustomer} from "../../models.types.js";


export default class CustomerRepository implements IPagination<ICustomer>{
    constructor() {}

    public async getAllItemsPagination(limit: number, offset: number, sortBy: string, sortDir: string): Promise<ICustomer[]> {

        return prisma.customer.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase()
            }
        })
    }

    public async getAllItemsSearchPagination(limit: number, offset: number, sortBy: string, sortDir: string, searchValue: string): Promise<ICustomer[]> {

        return prisma.customer.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortDir.toLowerCase()
            },
            where: {
                OR: [
                    {
                        firstName: {
                            contains: searchValue,
                        },
                    },
                    {
                        lastName: {
                            contains: searchValue,
                        },
                    },
                    {
                        address: {
                            contains: searchValue
                        }
                    }
                ]
            }
        })
    }
}