import { Module } from "@nestjs/common";
import { Admin, AdminRepository, adminSchema, Customer, CustomerRepository, customerSchema, Seller, SellerRepository, SellerSchema, User, UserRepository, UserSchema } from "src/models";
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
    providers: [
        UserRepository,
        SellerRepository,
        AdminRepository,
        CustomerRepository
    ],
    exports:[
        UserRepository,
        SellerRepository,
        AdminRepository,
        CustomerRepository
    ]
})
export class UserMongoModule {}