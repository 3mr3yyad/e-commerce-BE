import { Module } from "@nestjs/common";
import { Admin, AdminRepository, adminSchema, Customer, CustomerRepository, customerSchema, Seller, SellerRepository, SellerSchema, User, UserSchema } from "src/models";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
                discriminators: [
                    { name: Admin.name, schema: adminSchema },
                    { name: Seller.name, schema: SellerSchema },
                    { name: Customer.name, schema: customerSchema }
                ],
            },
        ]),
    ],
    providers:[
        SellerRepository,
        AdminRepository,
        CustomerRepository
    ],
    exports:[
        SellerRepository,
        AdminRepository,
        CustomerRepository
    ]
})
export class UserMongoModule {}