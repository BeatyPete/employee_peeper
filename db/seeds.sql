USE employeeDB;

INSERT INTO departments (Dep_Name)
VALUES ("vanilla"), 
    ("chocolate"), 
    ("strawberry");

INSERT INTO roles (job_title, salary, department_id)
VALUES
  ('Janitor', 1, 1),
  ('Executioner', 1, 3),
  ('Squire', 1, 2),
  ('Manager', 2, 1),
  ('Peasant', 2, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  ('Ronald', 'Firbank', 4, 1),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, 1),
  ('Charles', 'LeRoi', 4, 1),
  ('Katherine', 'Mansfield', 1, 4),
  ('Dora', 'Carrington', 5, 4),
  ('Edward', 'Bellamy', 5, 4),
  ('Montague', 'Summers', 5, 4),
  ('Octavia', 'Butler', 5, 4),
  ('Unica', 'Zurn', 2, 1);