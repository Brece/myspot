import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    nullable: false,
  })
  first_name: string;

  @Column({
    nullable: false,
  })
  last_name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  hashed_password: string;

  @Column({
    nullable: true,
  })
  hashed_rt: string; // hashed refresh token
}
