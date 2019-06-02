import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import  slugifly  from 'slugify'
import { Device } from "./device.entity";

@Entity("Areas")
export class Area {
    @PrimaryGeneratedColumn("uuid")
    public uuid!: string;

    @Column({ type: 'varchar', length: 150, unique: true})
    public name: string;

    @Column({ type: 'varchar', length: 150, unique: true})
    public slug: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public description: string;

    @ManyToOne(type => Area, area => area.childrens, { onDelete: 'CASCADE' })
    parent: Area;

    @OneToMany(type => Area, area => area.parent, { onDelete: 'CASCADE' })
    childrens: Area[];

    @OneToMany(type => Device, device => device.area)
    devices: Device[];

    constructor(name: string, description: string, parent: Area, childrens: Area[], devices: Device[]){
        this.name = name;
        this.slug = slugifly(String(this.name), { lower: true });
        this.description = description;
        this.parent = parent;
        this.childrens = childrens;
        this.devices = devices;
    }

}