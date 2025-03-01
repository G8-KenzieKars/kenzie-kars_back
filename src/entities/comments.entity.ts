import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Vehicle, User } from ".";

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  owner: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.comments, {
    onDelete: "CASCADE",
  })
  vehicle: Vehicle;
}
export { Comment };
