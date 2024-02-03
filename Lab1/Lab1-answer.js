//1. Create database named: FacultySystemDB.

use FacultySystemDB



//2. Create collection (student) without a schema.

    //that has:

    //? FirstName: string, LastName: string, Age: Number, Faculty: An object that

    //has Name and Address

    //? Grades: An array of objects, each object has: CourseName, Grade, Pass

    //(Boolean).

    //? IsFired: Boolean

db.createCollection("student")
 


//2. Create collection (student) with a schema.

/*

db.createCollection("student", {

  validator: {

    $jsonSchema: {

      bsonType: "object",

      required: ["FirstName", "LastName", "Age", "Faculty", "Grades", "IsFired"],

      properties: {

        FirstName: { bsonType: "string" },

        LastName: { bsonType: "string" },

        Age: { bsonType: "number" },

        Faculty: {

          bsonType: "object",

          required: ["Name", "Address"],

          properties: {

            Name: { bsonType: "string" },

            Address: { bsonType: "string" }

          }

        },

        Grades: {

          bsonType: "array",

          items: {

            bsonType: "object",

            required: ["CourseName", "Grade", "Pass"],

            properties: {

              CourseName: { bsonType: "string" },

              Grade: { bsonType: "number" },

              Pass: { bsonType: "boolean" }

            }

          }

        },

        IsFired: { bsonType: "boolean" }

      }

    }

  }

})



*/



//3. Insert 3 (at least) documents in Student collection with different values.

    //? Try inserting one record each time

    //? Try inserting many students using one insert statement.

db.student.insertOne({

  FirstName: "Hussein",

  LastName: "Elmlah",

  Age: 28,

  Faculty: { Name: "Computer Science", Address: "1 Cairo, Egypt" },

  Grades: [

    { CourseName: "mongo", Grade: 90, Pass: true },

    { CourseName: "c++", Grade: 95, Pass: true }

  ],

  IsFired: false

})



db.student.insertMany([

  {

    FirstName: "Taha",

    LastName: "Eldsouky",

    Age: 22,

    Faculty: { Name: "CS", Address: "1 Cairo, Egypt" },

    Grades: [

      { CourseName: "Physics", Grade: 85, Pass: true },

      { CourseName: "Chemistry", Grade: 70, Pass: true }

    ],

    IsFired: false

  },

  {

    FirstName: "Ahmed",

    LastName: "Ali",

    Age: 25,

    Faculty: { Name: "Engineering", Address: "1 Cairo, Egypt" },

    Grades: [

      { CourseName: "Programming", Grade: 85, Pass: true },

      { CourseName: "Databases", Grade: 80, Pass: true }

    ],

    IsFired: true

  }

])

  

//4. Retrieve the following data:

// All Students

db.student.find()

// Student with specific First Name

db.student.findOne({ FirstName: "Hussein" })

// Students whose First Name is "Ahmed" or Last Name is "Ahmed"

db.student.find({ $or: [{ FirstName: "Ahmed" }, { LastName: "Ahmed" }] })

// Students whose First name isn't "Ahmed"

db.student.find({ FirstName: { $ne: "Ahmed" } })

// Students with Age more than or equal to 21 and Faculty isn't NULL

db.student.find({ Age: { $gte: 21 }, "Faculty.Name": { $exists: true } })

// Display student with specific First Name, and display his First Name, Last name, IsFired fields only

db.student.findOne({ FirstName: "Hussein" }, { _id: 0, FirstName: 1, LastName: 1, IsFired: 1 })



//5. Update the student with specific FirstName, and change his LastName.

db.student.updateOne({ FirstName: "Ahmed" }, { $set: { LastName: "Kareem" } })



//6. Delete Fired students.

db.student.deleteMany({ IsFired: true })



//7. Delete all students collection.

db.student.drop()



//8. Delete the whole DB.

db.dropDatabase()





