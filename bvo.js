var zero = BigInt(0)
var one = BigInt(1)
var two = BigInt(2)
var range = Math.floor(Math.log(Number.MAX_SAFE_INTEGER)/Math.log(2))-1
var bvcount = 0

class BinaryVector {
    // create the binary vector from an array of booleans
	// NOTE: It is assumed that all bv sizes to be equal
	constructor(v,s=0){
		bvcount++
		if (s){
			this.rep = v
			this.size = s
		} else if (v && v.length) {
			this.size = v.length
			this.rep = zero
			for (var i = 0; i < this.size; i+=range){
				var c = 0
				var max = Math.min(i+range,this.size)
				for (var ii = i; ii < max; ii++)
					c += v[ii] ? 2**(ii-i) : 0
				this.rep += two ** BigInt(i) * BigInt(c)
			}
		} else {
			this.rep = zero
			this.size = 0;
		}
	}
    equals(bv){ // returns boolean
		return this.rep==bv.rep
    }
    intersection(bv){
		return this.size*bv.size ? new BinaryVector(this.rep&bv.rep, Math.max(this.size,bv.size)) : bvzero
    }
    union(bv){
		return this.size ? (bv.size ? new BinaryVector(this.rep|bv.rep, Math.max(this.size,bv.size)) : this) : bv
    }
	inverse(){
		return new BinaryVector(two ** BigInt(this.size) - one - this.rep, this.size)
	}
	// Not really the difference
	// Returns true when A=true and B=false
	// This is the inverse of the implication ~(A->B)
    difference(bv){
		return this.intersection(bv.inverse())
    }
    get(i){ // return boolean
		return this.rep&(two ** BigInt(i))
    }
}
var bvzero = new BinaryVector([])
