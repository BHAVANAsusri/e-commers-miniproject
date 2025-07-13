const mongoose = require("mongoose");
const Product = require("./models/Product");
const connectDB = require("./config/db");

connectDB();

const sampleProducts = [
  {
    name: "iPhone 14",
    price: 49900, 
    description: "Latest Apple smartphone",
    image: "https://m.media-amazon.com/images/I/61cwywLZR-L._AC_SL1500_.jpg"
    
  },
  {
    name: "Dell Laptop",
    price: 36289,
    description: "Powerful work laptop",
    image:"https://rukminim2.flixcart.com/image/704/844/xif0q/computer/i/7/r/latitude-3420-business-laptop-dell-original-imagn6hrwnczrmzv.jpeg?q=90&crop=false"
  },
  {
    name: "Logitech Mouse",
    price: 1500,
    description: "Wireless mouse",
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._AC_SL1500_.jpg"
  },
  {
    name: "iPhone 13",
    price: 70000 ,
    description: "Latest Apple smartphone",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjlpr_b5atc1SAkmhBNQXt1WWV6AjkIPR8XJC_1tBl8T76rUbMLqL14tXMOpisx1SyFC8&usqp=CAU"
  },
  {
    name: "Samsung Unveils New Galaxy Buds 3",
    price: 70000,
    description: "Latest Galaxy Buds 3 Pro",
    image:"https://cdn.xingosoftware.com/audioxpress/images/fetch/dpr_1,w_765,h_430,c_fit/https%3A%2F%2Faudioxpress.com%2Fassets%2Fupload%2Fimages%2F1%2F20240715154754_Samsung-Buds3Pro-SilverWhite-Cases-TWeb.jpg"
  },
  {
    name: " Apple Watch Series 3 Apple Watch Series 2",
    price: 32000,
    description: "Latest IPhone X Smartwatch PNG",
    image:"https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/63d399b3b3704229bbcf9a8d34a1c2ae~tplv-dx0w9n1ysr-crop-webp:400:400.webp?dr=10517&from=1476391136&idc=useast8&ps=933b5bde&shcp=0d52deaf&shp=57fff0e0&t=555f072d"
  },
  {
    name: "Hp Elitebook 840G4 A++ Grade Business Class Light Weight ",
    price: 2150000,
    description: "Latest Hp Elitebook 840G4 A++ ",
    image:" https://images.tokopedia.net/img/cache/500-square/product-1/2020/7/16/4262763/4262763_90524dad-8a6a-4a93-bf5d-1db1fcd5e4f3_554_554.jpg"
  },
  {
    name: "SAMSUNG 32 Class FHD (1080P) Smart LED TV (UN32N5300)", 
    price: 290000, 
    description: "Latest Smart LED TV ",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyL4GKnYO2vJChXwIbChls_E2xVIxiJmebgg&s"
    
  }
];

Product.deleteMany({})
  .then(() => Product.insertMany(sampleProducts))
  .then(() => {
    console.log("✅ Products seeded successfully");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
