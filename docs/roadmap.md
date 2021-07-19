**Structures**

| Level One Classes | Super| Implemented|Short Notes
|---|---|---|---|
|SquareRequest| none |yes|

| Level Two Classes |Super| Implemented|Short Notes
|---|---|---|---|
|List | SquareRequest|yes
|Retrieve | SquareRequest|yes
|Create | SquareRequest|yes
|Delete | SquareRequest|
|Update | SquareRequest|
|Group | SquareRequest|
|Ungroup| SquareRequest|

**CUSTOMERS STRUCTURES**

| Customer Classes |Super| Implemented|Short Notes
|---|---|---|---|
|CustomerList|List|yes
|CustomerRetrieve|Search|
|CustomerRetrieve|Retrieve|yes
|CustomerCreate|Create|in process - russ
|CustomerDelete|Delete|
|CustomerUpdate|Update|
|CustomerGroup|Group|
|CustomerUngroup|Ungroup|


| API | Command| Method | Resource Location | Class | 
|---|---|---|---|---|
|Customer| LIST all | GET| '/customers' | CustomerList |
|Customer| CREATE one| POST|'/customers'| CustomerCreate|
|Customer| SEARCH one | POST|'/customers/search' | CustomerRetrieve|
|Customer|DELETE one| DELETE |'/customers/{customer_id}' | |
|Customer|UPDATE one |PUT |'/customers/{customer_id}' | |
|Customer|REMOVE group from one |DELETE |'/customers/{customer_id}/groups/{group_id}' | |
|Customer|ADD group from one |PUT |'/customers/{customer_id}/groups/{group_id}' | |





