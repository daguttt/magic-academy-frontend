import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

export default function Demo(){

    
   return( 
    <Card>
        <img src="https://img.icons8.com/ios/50/FFFFFF/picture.png" alt="" className="w-full h-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"/>
    <CardHeader>
      <CardTitle>Course Title</CardTitle>
      <CardDescription>Instructor Name</CardDescription>
    </CardHeader>
    <CardContent>  
    0 classes
    </CardContent>
  </Card>
   
    )
};

