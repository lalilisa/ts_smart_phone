import { Application } from "express";
import express from 'express';

export const viewEngine= (app:Application)=>{
        app.use('',express.static(__dirname+"/public"))
        app.set("view engine", "ejs");
        app.set("views","./public/views");
        app.use('/product',express.static(__dirname+"/upload"))
        app.use('/admin',express.static(__dirname+"/public"))
     
        app.all('/admin',express.static(__dirname+"/public"))
}