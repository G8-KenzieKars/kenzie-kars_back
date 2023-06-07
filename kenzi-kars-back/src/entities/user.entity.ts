import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Address, Vehicle, Comment } from ".";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 50, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "varchar", length: 14 })
  cpf: string;

  @Column({ type: "varchar", length: 16 })
  phone: string;

  @Column({ type: "date" })
  bithdate: Date | string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "boolean" })
  is_seller: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Vehicle, (vehicle) => vehicle.seller)
  vehicles: Vehicle[];

  @OneToOne(() => Address)
  address: Address;

  @OneToMany(() => Comment, (comment) => comment.owner)
  comments: Comment[];
}
export { User };