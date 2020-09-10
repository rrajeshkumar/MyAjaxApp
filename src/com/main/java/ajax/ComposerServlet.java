package com.main.java.ajax;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class ComposerServlet
 */
@WebServlet("/composer")
public class ComposerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 private ComposerData compData = new ComposerData();
	 private HashMap composers = compData.getComposers();
	 private Gson gson = new Gson();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ComposerServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String targetId = request.getParameter("id");
        Composer composer = (Composer)composers.get(targetId);

        String jsonString = this.gson.toJson(composer);

		 PrintWriter out = response.getWriter();
	        response.setContentType("application/json");
	        response.setCharacterEncoding("UTF-8");
	        out.print(jsonString);
	        out.flush(); 

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
