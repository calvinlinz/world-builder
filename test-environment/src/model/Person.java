public class Person {

    private Long id;

    private String name;
    private String email;
    
    public Person(Long id, String name, String email){
        this.name = name;
        this.email = email;
        this.id = id;
    }


    public Long getId(){
        return this.id;
    }
    public String getName(){
        return this.name;
    }
    public String getEmail(){
        return this.email;
    }
}
