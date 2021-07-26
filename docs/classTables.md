**Structures**

| Level One Classes | Super| Implemented|Short Notes
|---|---|---|---|
|SquareRequest| none |yes|

| Level Two Classes |Super| Implemented|Short Notes
|---|---|---|---|
|List | SquareRequest|yes
|Create | SquareRequest|yes
|Search | SquareRequest| !
|RetrieveUpdateDelete | SquareRequest|yes
|Group | SquareRequest| !
|Ungroup| SquareRequest| !

**CUSTOMERS STRUCTURES**

| Customer Classes |Super| Implemented|Short Notes
|---|---|---|---|
|CustomerList|List|yes
|CustomerCreate|Create|yes
|CustomerSearch|Search| !
|CustomerDelete|Delete|yes
|CustomerRetrieve|Retrieve|yes
|CustomerUpdate|Update| !
|CustomerGroup|Group| !
|CustomerUngroup|Ungroup| !


| API | Command| Method | Resource Location | Class | 
|---|---|---|---|---|
|Customer| LIST all | GET| '/customers' | CustomerList |
|Customer| CREATE one| POST|'/customers'| CustomerCreate|
|Customer| SEARCH by Attribute | POST|'/customers/search' | CustomerRetrieve|
|Customer|DELETE one| DELETE |'/customers/{customer_id}' |CustomerDelete |
|Customer| RETRIEVE by ID | POST|'/customers/{customer_id}' | CustomerRetrieve|
|Customer|UPDATE one |PUT |'/customers/{customer_id}' | !
|Customer|REMOVE group from one |DELETE |'/customers/{customer_id}/groups/{group_id}' | !
|Customer|ADD group from one |PUT |'/customers/{customer_id}/groups/{group_id}' | !





