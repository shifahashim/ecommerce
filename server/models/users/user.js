const {query} = require('../../services/db.js');
const bcrypt = require('bcryptjs');
const {v4:uuid} = require('uuid');


const register =async(username,password,email)=>{
    const res = await query('INSERT INTO users (fullname, password,email) VALUES (?, ?)', [
        username,
        password,
        email
      ]);
      
}

const add = async (userDetails) => {
    const {
        fullname,
        email,
        password,
        phonenumber,
        address_line_1,
        address_line_2,
        city,
        state,
        postal_code,
        country,
        userrole
    } = userDetails;
    
    const existingUser = await query("SELECT * FROM user WHERE email = ?",[email]);
    if(existingUser?.length)
    {
        return{success:false,message:"A user with this email exist."}
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuid();
    const res = await query(`
        INSERT INTO user ( 
            user_id,
            fullname,
            email,
            password,
            phonenumber, 
            address_line_1, 
            address_line_2, 
            city, 
            state, 
            postal_code, 
            country, 
            userrole
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?);`,
        [userId,fullname,email,hashedPassword,phonenumber, address_line_1, address_line_2, city, state, postal_code, country, userrole,userId]
    );

    return {userId,...res};
};

const get = async ({ id = null, email = null, refresh_token = null }) => {
    if (email) {
      const res = await query("SELECT * FROM user WHERE email = ?", [email]);
      if (res.length < 1) {
        throw { status: 404, message: "User not found" };
      }
      return res[0];
    } else if (id) {
      const res = await query("SELECT * FROM user WHERE id = ?", [id]);
      if (res.length < 1) {
        throw { status: 404, message: "User not found" };
      }
      return res[0];
    } else if (refresh_token) {
      const res = await query("SELECT * FROM user WHERE refresh_token = ?", [
        refresh_token,
      ]);
      if (res.length < 1) {
        throw { status: 404, message: "User not found" };
      }
      return res[0];
    } else {
      console.error("Please specifiy the lookup field for .get()");
    }
  };

  const update = async (id, userDetails) => {
    try {
      const {
        name,
        password,
        refresh_token,
        gender,
        email,
        address,
        phone,
        photo,
      } = userDetails;
  
      const fields = [];
      const values = [];
  
      if (name) {
        fields.push("name = ?");
        values.push(name);
      }
      if (password) {
        fields.push("password = ?");
        values.push(password);
      }
      if (refresh_token) {
        fields.push("refresh_token = ?");
        if (refresh_token === "null") values.push(null);
        else values.push(refresh_token);
      }
      if (gender) {
        fields.push("gender = ?");
        values.push(gender);
      }
      if (email) {
        fields.push("email = ?");
        values.push(email);
      }
      if (address) {
        fields.push("address = ?");
        values.push(address);
      }
      if (phone) {
        fields.push("phone = ?");
        values.push(phone);
      }
      if (photo) {
        fields.push("photo = ?");
        values.push(photo);
      }
  
      if (fields.length === 0) {
        throw { status: 400, message: "No fields provided for update" };
      }
  
      values.push(id);
  
      const sql = `UPDATE user SET ${fields.join(", ")} WHERE user_id = ?`;
      const result = await query(sql, values);
      if (result.affectedRows === 0) {
        throw { status: 404, message: "User not found" };
      }
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

module.exports={
    add,
    get,
    update
}
